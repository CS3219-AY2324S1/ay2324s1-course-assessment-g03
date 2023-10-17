import React, { useEffect, useMemo, useRef } from "react";
import { Card, CustomButton } from "@/components";
import { DIFFICULTY, DifficultyType, TopicTagType } from "@/constants/question";
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
import { useGetQuestionFilters } from "../api";

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

const getTopicsForDifficulty = (
  difficulties: {
    value: DifficultyType;
    label: DifficultyType;
  }[],
  data?: {
    Easy: string[];
    Medium: string[];
    Hard: string[];
  },
) => {
  const topicsSet: Map<
    string,
    {
      value: TopicTagType;
      label: TopicTagType;
    }
  > = new Map();

  if (!data) return topicsSet;

  for (const difficulty of difficulties) {
    const topics = data[difficulty.value];
    if (topics) {
      topics.forEach(topic =>
        topicsSet.set(topic, {
          value: topic as TopicTagType,
          label: topic as TopicTagType,
        }),
      );
    }
  }

  return topicsSet;
};

export const SelectPreferencesCard = React.memo(({ joinCallback }: Props) => {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PreferencesFormValues>({
    defaultValues: {
      difficulties: [],
      topics: [],
    },
  });
  const watchDifficulties = watch("difficulties");
  const watchTopics = watch("topics");
  const prevTopicsLength = useRef(watchTopics.length);
  const { isLoading, data } = useGetQuestionFilters();

  const difficultyOptions = useMemo(() => {
    return Object.values(DIFFICULTY).map(difficulty => ({
      value: difficulty,
      label: difficulty,
    }));
  }, []);

  const topicOptions = useMemo(
    () => getTopicsForDifficulty(watchDifficulties, data?.data),
    [watchDifficulties],
  );

  // Filter user selected topics when difficulty changes
  useEffect(() => {
    // Only filter new topics when difficulties are added
    const currLength = watchTopics.length;
    const prevLength = prevTopicsLength.current;
    if (currLength <= prevLength) return;

    const onDifficultiesChange = () => {
      setValue(
        "topics",
        watchTopics.filter(topic => topicOptions.has(topic.value)),
      );
    };

    onDifficultiesChange();
  }, [watchDifficulties]);

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
                options={difficultyOptions}
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
                isLoading={isLoading}
                isMulti
                options={[...topicOptions.values()]}
                onChange={field.onChange}
                value={watchTopics}
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
});
