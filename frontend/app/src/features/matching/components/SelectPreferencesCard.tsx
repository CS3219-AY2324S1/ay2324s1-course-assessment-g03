import { Card, CustomButton } from "@/components";
import {
  DIFFICULTY,
  DifficultyType,
  TOPIC_TAG,
  TopicTagType,
} from "@/constants/question";
import { Preferences } from "@/types/matching";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Select } from "chakra-react-select";
import { multiSelectStyles } from "@/theme";

type PreferencesFormValues = {
  difficulties: {
    value: DifficultyType;
    label: DifficultyType;
  }[];
  topics: {
    value: TopicTagType;
    label: TopicTagType;
  }[];
};

type Props = {
  joinCallback: (preferences: Preferences) => void;
};

export const SelectPreferencesCard = ({ joinCallback }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PreferencesFormValues>({
    defaultValues: {
      difficulties: [],
      topics: [],
    },
  });

  const onSubmit = handleSubmit(async values => {
    const parsedValues = {
      difficulties: values.difficulties.map(difficulty => difficulty.value),
      topics: values.topics.map(topic => topic.value),
    };
    joinCallback(parsedValues);
  });

  return (
    <Card w="full" maxW="36rem">
      <VStack as="form" gap="1.25rem" onSubmit={onSubmit}>
        <Text alignSelf="start" textStyle="heading-md">
          Select question preferences
        </Text>
        <FormControl isInvalid={!!errors["difficulties"]}>
          <FormLabel color="light.100">Difficulty</FormLabel>
          <Controller
            name="difficulties"
            control={control}
            render={({ field }) => (
              <Select
                // @ts-expect-error Issue with chakra-react-select types (https://github.com/csandman/chakra-react-select/issues/273)
                chakraStyles={multiSelectStyles()}
                closeMenuOnSelect={false}
                isMulti
                options={Object.values(DIFFICULTY).map(difficulty => ({
                  value: difficulty,
                  label: difficulty,
                }))}
                onChange={field.onChange}
              />
            )}
          />
          <FormErrorMessage>
            {errors["difficulties"] && errors["difficulties"].message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors["topics"]}>
          <FormLabel color="light.100">Category</FormLabel>
          <Controller
            name="topics"
            control={control}
            render={({ field }) => (
              <Select
                // @ts-expect-error Issue with chakra-react-select types (https://github.com/csandman/chakra-react-select/issues/273)
                chakraStyles={multiSelectStyles()}
                closeMenuOnSelect={false}
                isMulti
                options={Object.values(TOPIC_TAG).map(difficulty => ({
                  value: difficulty,
                  label: difficulty,
                }))}
                onChange={field.onChange}
              />
            )}
          />
          <FormErrorMessage>
            {errors["topics"] && errors["topics"].message}
          </FormErrorMessage>
        </FormControl>
        <HStack alignSelf="end" paddingTop="0.5rem">
          <CustomButton type="submit" isLoading={isSubmitting}>
            Join room
          </CustomButton>
        </HStack>
      </VStack>
    </Card>
  );
};
