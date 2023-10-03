import { Select, VStack, Text } from "@chakra-ui/react";

interface Option {
    id: number;
    description: string;
}

interface Props {
    title: string;
    options: Option[]
    placeholder?: string;
}

export const Dropdown: React.FC<Props> = ({ title, options, placeholder }) => {
    return (
        <VStack align="left">
            <Text textStyle="text-sm">{title}</Text>
            <Select placeholder={placeholder ?? "Select Option"} size="xs" textColor="white">
                {options.map(({ id, description }) =>
                    <option key={id} value={id}>{description}</option>
                )}
            </Select>
        </VStack>
    )
}