import PageHeader from "../../components/page-header";
import ReactTable from "../../components/react-table";

const Books = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader text="Books" />
      <ReactTable />
    </div>
  );
};

export default Books;
