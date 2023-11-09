import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiFadersHorizontalBold,
} from "react-icons/pi";
import { QUESTIONS_FILTERS } from "../constants/questionsFilters";
import { useReducer } from "react";
import { DEFAULT_PAGE_NUM, INIT_QUESTIONS_FILTERS } from "../constants";
import { useQuestions } from "./QuestionsOutlet";

export interface QuestionsFilters {
  difficulty: string[];
  category: string[];
  topic: string[];
  status: string[];
}

interface QuestionsFiltersReducerAction {
  type: string;
  value: string[];
}

const questionsFiltersReducer = (
  state: QuestionsFilters,
  action: QuestionsFiltersReducerAction,
) => {
  switch (action.type) {
    case "difficulty":
      return { ...state, difficulty: action.value };
    case "category":
      return { ...state, category: action.value };
    case "topic":
      return { ...state, topic: action.value };
    case "status":
      return { ...state, status: action.value };
    case "clear":
      return INIT_QUESTIONS_FILTERS;
    default:
      return state;
  }
};

const QuestionsFilters = () => {
  const [state, dispatch] = useReducer(
    questionsFiltersReducer,
    INIT_QUESTIONS_FILTERS,
  );
  const { setPageNum, setFilters, refetch } = useQuestions();

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            leftIcon={<PiFadersHorizontalBold />}
            rightIcon={isOpen ? <PiCaretUpBold /> : <PiCaretDownBold />}
            minW="fit-content"
          >
            Filters
          </MenuButton>
          <MenuList p="0">
            <Box w={64} h={96} overflow="scroll" p={1}>
              {QUESTIONS_FILTERS.map(filter => (
                <MenuOptionGroup
                  key={filter.key}
                  title={filter.title}
                  type={filter.type}
                  onChange={value =>
                    dispatch({ type: filter.key, value: value as string[] })
                  }
                  value={state[filter.key as keyof typeof state]}
                >
                  {filter.options.map((option, i) => (
                    <MenuItemOption
                      key={i}
                      closeOnSelect={false}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              ))}
            </Box>
            <ButtonGroup
              borderColor="dark.800"
              borderTop="1px"
              p={2}
              w="full"
              justifyContent="end"
            >
              <Button
                bg="transparent"
                border="none"
                color="dark.300"
                _hover={{ color: "dark.100" }}
                onClick={() => dispatch({ type: "clear", value: [] })}
              >
                Clear
              </Button>
              <Button
                onClick={async () => {
                  await setFilters(state);
                  await setPageNum(DEFAULT_PAGE_NUM);
                  refetch();
                }}
              >
                Apply
              </Button>
            </ButtonGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default QuestionsFilters;
