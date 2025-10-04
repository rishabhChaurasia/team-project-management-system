import WorkspaceHeader from "./workspace/WorkspaceHeader";
import EditWorkspaceForm from "./workspace/EditWorkspaceForm";
import DeleteWorkspaceCard from "./workspace/DeleteWorkspaceCard";

const Settings = () => {
  return (
    <div className="w-full h-auto py-2 px-4 sm:px-6 lg:px-8">
      <WorkspaceHeader />
      <main className="mt-4 sm:mt-6">
        <div className="w-full max-w-3xl mx-auto py-3">
          <h2 className="text-lg sm:text-[20px] leading-[28px] sm:leading-[30px] font-semibold mb-4 sm:mb-6 text-center sm:text-left">
            Workspace settings
          </h2>

          <div className="flex flex-col space-y-6 sm:space-y-8">
            <div className="w-full">
              <EditWorkspaceForm />
            </div>
            <div className="w-full">
              <DeleteWorkspaceCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
