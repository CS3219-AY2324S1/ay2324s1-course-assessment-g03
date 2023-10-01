import { Select, Text, VStack } from "@chakra-ui/react";

interface Props {
    placeholder?: string;
    title: string;
    options: { description: string; id: number; }[];
    onChangeHandler: React.Dispatch<React.SetStateAction<number>>;
}

export const QuestionDropdown: React.FC<Props> = ({ title, options, placeholder, onChangeHandler }) => {
    return (
        <VStack align="left" color="white">
            <Text textStyle="text-sm">{title}</Text>
            <Select textStyle="text-sm" placeholder={placeholder ?? "Select Option"} size="xs" borderColor="ActiveBorder" rounded="md" onChange={(e) => onChangeHandler(Number(e.target.value))}>
                {options.map((option, index) => <option key={index} value={option.id}>{option.description}</option>)}
            </Select>
        </VStack>
    )
} 