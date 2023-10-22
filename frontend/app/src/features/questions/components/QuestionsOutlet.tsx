import { Question } from "@/types/question";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  DEFAULT_PAGE_NUM,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORTING_STATE,
} from "../constants";
import { SortingState } from "@tanstack/react-table";
import { useDisclosure } from "@chakra-ui/react";
import { useQuestionsQuery } from "../api/useQuestionsQuery";
import { Outlet, useOutletContext } from "react-router-dom";

interface QuestionsContextType {
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  data: any;
  isLoading: boolean;
  refetch: () => void;
  isRefetching: boolean;
  currQuestion: Partial<Question> | undefined;
  setCurrQuestion: Dispatch<SetStateAction<Partial<Question> | undefined>>;
  isUpsertModalOpen: boolean;
  onUpsertModalOpen: () => void;
  onUpsertModalClose: () => void;
  isDeleteModalOpen: boolean;
  onDeleteModalOpen: () => void;
  onDeleteModalClose: () => void;
  btnRef: React.RefObject<any>;
}

export const QuestionsOutlet = () => {
  const [pageNum, setPageNum] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING_STATE);
  const { data, isLoading, isRefetching, refetch } = useQuestionsQuery({
    pageNum,
    pageSize,
    sorting,
  });
  const [currQuestion, setCurrQuestion] = useState<Partial<Question>>();
  const {
    isOpen: isUpsertModalOpen,
    onOpen: onUpsertModalOpen,
    onClose: onUpsertModalClose,
  } = useDisclosure();
  const btnRef = useRef();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  return (
    <Outlet
      context={{
        pageNum,
        setPageNum,
        pageSize,
        setPageSize,
        sorting,
        setSorting,
        data,
        isLoading,
        refetch,
        isRefetching,
        currQuestion,
        setCurrQuestion,
        isUpsertModalOpen,
        onUpsertModalOpen,
        onUpsertModalClose,
        isDeleteModalOpen,
        onDeleteModalOpen,
        onDeleteModalClose,
        btnRef,
      }}
    />
  );
};

export const useQuestions = () => useOutletContext<QuestionsContextType>();
