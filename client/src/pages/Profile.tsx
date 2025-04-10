
import Results from "@/components/Results";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/dialog/DeleteDialog";
import { EditDialog } from "@/dialog/EditDialog";
import { useAppSelector } from "@/services/hook";

export default function Profile() {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-8 py-6 justify-around container ">
      <h2 className="text-center font-semibold text-2xl sm:text-3xl text-foreground">Profile</h2>
      <div className="flex flex-col  sm:p-4 p-2 sm:flex-row justify-evenly gap-6 sm:gap-0 text-sm sm:text-base">
        <div className="space-y-2">
          <p><span className="font-bold">Name:</span> {user?.username}</p>
          <p><span className="font-bold">Email:</span> {user?.email}</p>
          <p><span className="font-bold">Joined:</span> {user && new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="space-y-4 ">
          <p className="font-medium text-xl">Total Tests:<span className="text-xl"> {user?.results?.length ?? 0}</span></p>
          <div className="flex justify-end   gap-4 sm:gap-6">
            {user && (
              <>
                <EditDialog user={user}>
                  <Button variant="outline" className="">Edit</Button>
                </EditDialog>
                <DeleteDialog>
                  <Button variant="destructive" className="">Delete</Button>
                </DeleteDialog>
              </>
            )}
          </div>
        </div>
      </div>

      <Results />
    </div>);
}