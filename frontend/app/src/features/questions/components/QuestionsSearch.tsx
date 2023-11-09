import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useQuestions } from "./QuestionsOutlet";
import { DEFAULT_PAGE_NUM } from "../constants";

const QuestionsSearch = () => {
  const {
    search,
    pageNum,
    setPageNum,
    prevPageNum,
    setPrevPageNum,
    setSearch,
    refetch,
  } = useQuestions();

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
          if (pageNum !== DEFAULT_PAGE_NUM) {
            setPrevPageNum(pageNum);
          }
          if (e.target.value) {
            await setPageNum(DEFAULT_PAGE_NUM);
          } else {
            await setPageNum(prevPageNum);
          }
          refetch();
        }}
        w={72}
      />
    </InputGroup>
  );
};

export default QuestionsSearch;
