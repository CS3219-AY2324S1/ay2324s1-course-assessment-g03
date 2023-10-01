import { Box, HStack, Text, Flex } from "@chakra-ui/react"
import { QuestionView, CodeView, HideQuestionButton, QuestionDropdown } from "."
import { useState } from "react"

const mockQuestions = [{ id: 1, description: "Two Sum" }, { id: 2, description: "Three Sum" }, { id: 3, description: "Four Sum" }]
const mockLanguages = [{ id: 1, description: "Javascript" }, { id: 2, description: "Typescript" }]

export const CodeEditor = () => {

    const [renderQuestion, setRenderQuestion] = useState(true)
    const [activeQuestionId, setActiveQuestionId] = useState(1)
    const [activeLanguageId, setActiveLanguageId] = useState(1)

    console.log(activeQuestionId)
    console.log(activeLanguageId)

    const options = (
        <HStack>
            {renderQuestion && <QuestionDropdown title="Question" options={mockQuestions} onChangeHandler={setActiveQuestionId} />}
            <QuestionDropdown title="Language" options={mockLanguages} onChangeHandler={setActiveLanguageId} />
        </HStack>
    )

    const visibleView = (
        <Flex gap="4" width="full">
            <Flex flex={1} flexDirection={"column"} gap="4">
                {options}
                <QuestionView />
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap="2">
                <Text textColor="white" textStyle="text-sm">
                    Code
                </Text>
                <CodeView />
            </Flex>
        </Flex>
    )

    const hiddenView = (
        <Flex flexDirection={"column"} gap="4">
            {options}
            <CodeView />
        </Flex>
    )

    return (
        <Flex flexDirection={"column"} border="1px" borderColor="ActiveBorder" rounded="md" padding="3" gap="4" flex={1}>
            <Flex flex={1}>
                {renderQuestion ? visibleView : hiddenView}
            </Flex>
            <Box>
                <HideQuestionButton renderQuestion={renderQuestion} setRenderQuestion={setRenderQuestion} />
            </Box>
        </Flex>
    )
}
