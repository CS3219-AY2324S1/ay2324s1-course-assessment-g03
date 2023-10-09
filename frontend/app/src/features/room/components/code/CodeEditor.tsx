import { useEffect, useState } from 'react'
import CodeMirror, { basicSetup } from '@uiw/react-codemirror'
import { Socket } from "socket.io-client"
import { LanguageSupport, indentUnit } from '@codemirror/language'
import { Box, Text } from '@chakra-ui/react'
import { getDocument, peerExtension } from '@/lib/collab'
import { Spinner } from '@chakra-ui/react'

interface CodeEditorProps {
    socket: Socket;
    className?: string;
    roomId: string;
    language: LanguageSupport;
}

export const CodeEditor = ({ socket, roomId, language }: CodeEditorProps) => {

    const [doc, setDoc] = useState<string | null>(null)
    const [version, setVersion] = useState<number | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { version, doc } = await getDocument(socket, roomId)
                setVersion(version)
                setDoc(doc.toString())
            } catch (error) {
                console.error('Error fetching document', error)
                setError(error)
            }
            setLoading(false)
        }

        fetchData()

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('pullUpdateResponse')
            socket.off('pushUpdateResponse')
            socket.off('getDocumentResponse')
        }

    }, [socket, roomId])

    if (isLoading) {
        return <Spinner />
    } else if (error || (version === null || doc === null)) {
        return <Text>{error instanceof Error ? error.message : "An error has occurred"}</Text>
    } else {
        return (<Box>
            <Text>{`You are in room ${roomId}`}</Text>
            <CodeMirror
                height="100%"
                basicSetup={false}
                id="codeEditor"
                theme="dark"
                extensions={[
                    indentUnit.of("\t"),
                    basicSetup(),
                    language,
                    peerExtension(socket, version)
                ]}
                value={doc}
            />
        </Box>)
    }
}