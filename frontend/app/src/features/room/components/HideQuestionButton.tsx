import { Button } from "@chakra-ui/react"

interface Props {
    renderQuestion: boolean;
    setRenderQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HideQuestionButton: React.FC<Props> = ({ renderQuestion, setRenderQuestion }) => {
    return (
        <Button size="sm" rounded="md" background="#3F3F46" textColor="white" onClick={() => setRenderQuestion(!renderQuestion)}>
            {renderQuestion ? "Hide" : "Show"} Question
        </Button>
    )
}