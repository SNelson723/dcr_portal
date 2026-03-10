import { useAppSelector } from "../../hooks";

export const useTSCtx = () => {
  const { weekEndings, selectedWE, rowData } = useAppSelector(
    (state) => state.timesheet,
  );
  const { userid } = useAppSelector((state) => state.user);
  const { url, token } = useAppSelector((state) => state.app);

  return {
    rowData,
    selectedWE,
    token,
    url,
    userid,
    weekEndings,
  };
};
