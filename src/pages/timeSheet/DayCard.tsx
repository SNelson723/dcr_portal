import type { TSRowData } from "../../interfaces/timesheet";

interface DayCardProps {
  data: TSRowData;
}

const DayCard = ({ data }: DayCardProps) => {
  console.log("day card data", data);
  return (
    <div className="bg-custom-white rounded-lg shadow-lg">
      <div>Day Card</div>
    </div>
  );
};

export default DayCard;
