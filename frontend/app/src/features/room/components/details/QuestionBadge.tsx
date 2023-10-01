import { Button } from "@chakra-ui/react"

interface Props {
    value: string;
    background: string;
    borderColor: string;
    textColor: string;
}

export const QuestionBadge: React.FC<Props> = ({ value, background, borderColor, textColor }) => {
    return (
        <Button disabled background={background} borderColor={borderColor} textColor={textColor} border="1px" rounded="md">
            {value}
        </Button>
    )

}