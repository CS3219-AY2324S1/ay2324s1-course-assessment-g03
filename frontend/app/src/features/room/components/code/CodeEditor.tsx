import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CodeMirror, { EditorView, basicSetup } from "@uiw/react-codemirror";
import { Socket } from "socket.io-client";
import { LanguageSupport, indentUnit } from "@codemirror/language";
import { Text } from "@chakra-ui/react";
import { getDocument, peerExtension } from "@/lib/collab";
import { Spinner } from "@chakra-ui/react";

interface CodeEditorProps {
  doc: string | null;
  setDoc: Dispatch<SetStateAction<string | null>>;
  socket?: Socket | null;
  className?: string;
  roomId: string;
  language: LanguageSupport;
}

export const CodeEditor = ({
  doc,
  setDoc,
  socket,
  roomId,
  language,
}: CodeEditorProps) => {
  const [version, setVersion] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData() {
      if (!socket) {
        return;
      }
      try {
        const { version, doc } = await getDocument(socket, roomId);
        setVersion(version);
        setDoc(doc.toString());
      } catch (error) {
        console.error("Error fetching document", error);
        setError(error);
      }
      setLoading(false);
    }

    fetchData();

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("pullUpdateResponse");
      socket?.off("pushUpdateResponse");
      socket?.off("getDocumentResponse");
    };
  }, [socket, roomId, setDoc]);

  if (isLoading || !socket) {
    return <Spinner />;
  } else if (error || version === null || doc === null) {
    return (
      <Text>
        {error instanceof Error ? error.message : "An error has occurred"}
      </Text>
    );
  } else {
    return (
      <CodeMirror
        height="80vh"
        basicSetup={false}
        id="codeEditor"
        theme="dark"
        extensions={[
          indentUnit.of("\t"),
          basicSetup(),
          language,
          peerExtension(socket, version),
          EditorView.lineWrapping,
        ]}
        value={doc}
      />
    );
  }
};
