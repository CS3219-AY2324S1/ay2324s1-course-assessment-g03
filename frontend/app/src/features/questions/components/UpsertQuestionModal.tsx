import {
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  HStack,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { QUESTIONS_FIELDS } from "../constants/questionsFields";
import { useQuestions } from "./QuestionsOutlet";
import { useCreateQuestion } from "../api/useCreateQuestion";
import { SubmitHandler, useForm } from "react-hook-form";
import { INPUT_TYPE } from "../types";
import { z } from "zod";
import ControlledSelect from "@/components/forms/ControlledSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateQuestion } from "../api/useUpdateQuestion";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type Option = z.infer<typeof optionSchema>;

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: optionSchema
    .nullable()
    .refine(Boolean, { message: "Category is required" }),
  difficulty: optionSchema
    .nullable()
    .refine(Boolean, { message: "Difficulty is required" }),
  topic_tags: z
    .array(optionSchema)
    .nullable()
    .refine(Boolean, { message: "At least one topic is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  url: z.string().url().or(z.literal("")),
});

export type FormValues = z.infer<typeof formSchema>;

const DEFAULT_VALUES = {
  title: "",
  category: null,
  difficulty: null,
  topic_tags: null,
  description: "",
  url: "",
};

const UpsertQuestionModal = () => {
  const { currQn, isUpsertModalOpen, onUpsertModalClose } = useQuestions();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
    values: currQn
      ? {
          title: currQn.title,
          category: {
            label: currQn.category,
            value: currQn.category,
          },
          difficulty: {
            label: currQn.difficulty,
            value: currQn.difficulty,
          },
          topic_tags: currQn.topic_tags?.map(topic => ({
            label: topic,
            value: topic,
          })),
          description: currQn.description,
          url: currQn.url || "",
        }
      : DEFAULT_VALUES,
  });
  const createQuestion = useCreateQuestion();
  const updateQuestion = useUpdateQuestion();

  const onSubmit: SubmitHandler<FormValues> = ({
    difficulty,
    category,
    topic_tags,
    url,
    ...values
  }) => {
    if (currQn) {
      updateQuestion.mutate({
        id: currQn.id!,
        difficulty: difficulty?.value,
        category: category?.value,
        topic_tags: topic_tags?.map(({ value }) => value),
        url: url || undefined,
        ...values,
      });
    } else {
      createQuestion.mutate({
        difficulty: difficulty?.value,
        category: category?.value,
        topic_tags: topic_tags?.map(({ value }) => value),
        url: url || undefined,
        ...values,
      });
    }
    onUpsertModalClose();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Modal isOpen={isUpsertModalOpen} onClose={onUpsertModalClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <HStack alignItems="center">
          <ModalHeader flex="flex-1">
            {currQn ? "Edit" : "Create"} Question
          </ModalHeader>
          <ModalCloseButton />
        </HStack>
        <ModalBody display="flex" flexDir="column" gap={4}>
          {QUESTIONS_FIELDS.map(({ key, label, type, options }) => {
            switch (type) {
              case INPUT_TYPE.TEXTAREA:
                return (
                  <FormControl isInvalid={!!errors[key]} key={key}>
                    <FormLabel fontSize="sm" htmlFor={key}>
                      {label}
                    </FormLabel>
                    <Textarea id={key} {...register(key)} />
                    <FormErrorMessage>{errors[key]?.message}</FormErrorMessage>
                  </FormControl>
                );
              case INPUT_TYPE.SELECT:
                return (
                  <ControlledSelect<FormValues, Option, false>
                    control={control}
                    key={key}
                    label={label}
                    name={key}
                    options={options}
                  />
                );
              case INPUT_TYPE.MULTISELECT:
                return (
                  <ControlledSelect<FormValues, Option, true>
                    control={control}
                    isMulti
                    key={key}
                    label={label}
                    name={key}
                    options={options}
                  />
                );
              default:
                return (
                  <FormControl key={key} isInvalid={!!errors[key]}>
                    <FormLabel fontSize="sm" htmlFor={key}>
                      {label}
                    </FormLabel>
                    <Input id={key} {...register(key)} />
                    <FormErrorMessage>{errors[key]?.message}</FormErrorMessage>
                  </FormControl>
                );
            }
          })}
        </ModalBody>
        <ModalFooter>
          <Button
            bg="transparent"
            border="none"
            color="dark.300"
            _hover={{ color: "dark.100" }}
            onClick={() => {
              onUpsertModalClose();
              handleReset();
            }}
          >
            Cancel
          </Button>
          <Button isLoading={isSubmitting} type="submit">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpsertQuestionModal;
