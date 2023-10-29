import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useQuestions } from "./QuestionsOutlet";

const QuestionsSearch = () => {
  const { search, setSearch, refetch } = useQuestions();

  return (
    <InputGroup>
      <InputLeftElement color="dark.300" pointerEvents="none">
        <PiMagnifyingGlassBold />
      </InputLeftElement>
      <Input
        placeholder="Search by title or description"
        focusBorderColor="dark.700"
        value={search}
        onChange={async e => {
          await setSearch(e.target.value);
          refetch();
        }}
        w={72}
      />
    </InputGroup>
  );
};

export default QuestionsSearch;
