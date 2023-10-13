import { useAuth } from "@/hooks";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  TabPanel,
  VStack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { usePutUser } from "../api/usePutUser";

type ProfileSettingsFormValues = {
  name: string;
};

export const ProfilePanel = () => {
  const { data, isLoading } = useAuth();
  const { mutate } = usePutUser();

  const user = data?.user;

  const { handleSubmit, register, formState } =
    useForm<ProfileSettingsFormValues>({
      defaultValues: {
        name: "",
      },
      values: {
        name: user?.name ?? "",
      },
    });

  const { errors, isSubmitting, isDirty, isValid } = formState;

  const onSubmit = handleSubmit(async values => {
    const parsedValues: Record<string, string> = {};
    if (values.name) {
      parsedValues["name"] = values.name;
    }

    mutate({ user: parsedValues });
  });

  return (
    <TabPanel height="full">
      {isLoading ? (
        <Spinner />
      ) : !user ? (
        <Text>An error has occurred with fetching your user profile</Text>
      ) : (
        <Box as="form" onSubmit={onSubmit} height="full">
          <VStack height="full">
            <FormControl isInvalid={!!errors.name}>
              <FormLabel color="light.100" htmlFor="name">
                Name
              </FormLabel>
              <Input color="light.100" {...register("name")} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              alignSelf="start"
              mt="auto"
              isDisabled={!isDirty || !isValid}
              type="submit"
            >
              {isSubmitting ? <Spinner /> : "Save"}
            </Button>
          </VStack>
        </Box>
      )}
    </TabPanel>
  );
};
