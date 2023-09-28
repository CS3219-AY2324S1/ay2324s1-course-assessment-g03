import { Card } from "@/components";
import {
  DIFFICULTY,
  DifficultyType,
  TOPIC_TAG,
  TopicTagType,
} from "@/constants/question";
import {
  Button,
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
import { io } from "socket.io-client";

type PreferencesFormValues = {
  difficulty:
    | {
        value: DifficultyType;
        label: DifficultyType;
      }[]
    | undefined;
  category:
    | {
        value: TopicTagType;
        label: TopicTagType;
      }[]
    | undefined;
};

const socket = io('http://localhost:8004');

export const SelectPreferencesCard = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PreferencesFormValues>();

  const onSubmit = handleSubmit(async values => {
    const parsedValues = {
      difficulty: values.difficulty?.map(difficulty => difficulty.value),
      category: values.category?.map(category => category.value),
    };
    socket.emit('join', parsedValues);
  });

  return (
    <Card w="34rem">
      <VStack as="form" gap="1.25rem" onSubmit={onSubmit}>
        <Text alignSelf="start" textStyle="heading-md">
          Select question preferences
        </Text>
        <FormControl isInvalid={!!errors["difficulty"]}>
          <FormLabel color="white">Difficulty</FormLabel>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <Select
                // @ts-expect-error Issue with chakra-react-select types (https://github.com/csandman/chakra-react-select/issues/273)
                chakraStyles={multiSelectStyles}
                isClearable={false}
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
            {errors["difficulty"] && errors["difficulty"].message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors["category"]}>
          <FormLabel color="white">Category</FormLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                // @ts-expect-error Issue with chakra-react-select types (https://github.com/csandman/chakra-react-select/issues/273)
                chakraStyles={multiSelectStyles}
                isClearable={false}
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
            {errors["category"] && errors["category"].message}
          </FormErrorMessage>
        </FormControl>
        <HStack alignSelf="end">
          <Button type="submit" colorScheme="light" isLoading={isSubmitting}>
            Join room
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};
