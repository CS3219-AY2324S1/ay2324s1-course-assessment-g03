import React, { useEffect, useState } from 'react'
import CodeMirror, { basicSetup } from '@uiw/react-codemirror'
import { Socket } from "socket.io-client"
import { indentUnit } from '@codemirror/language'
import { langs } from '@uiw/codemirror-extensions-langs'
import { Box, Text } from '@chakra-ui/react'
import { getDocument, peerExtension } from '@/lib/collab'

interface Props {
    socket: Socket;
    className?: string;
}

export const CodeEditor: React.FC<Props> = ({ socket }) => {

    const [doc, setDoc] = useState<string | null>(null)
    const [version, setVersion] = useState<number | null>(null)
    const [roomId, setRoomId] = useState<string>("1")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { version, doc } = await getDocument(socket, roomId)
                setVersion(version)
                setDoc(doc.toString())
            } catch (error) {
                console.error('Error fetching document', error)
            }
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



    if (version != null && doc != null) {
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
                    langs.python(),
                    peerExtension(socket, version, roomId)
                ]}
                value={doc}
            />
        </Box>)
    } else {
        return <Box>Loading...</Box>
    }
}