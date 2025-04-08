import Results from "@/components/Results";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DeleteDialog } from "@/dialog/DeleteDialog";
import { EditDialog } from "@/dialog/EditDialog";
import { useAppSelector } from "@/services/hook";

export default function Profile() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <div className="flex flex-col flex-1 items-center px-4 sm:px-8 py-6 space-y-8">
      <h2 className="text-center font-semibold text-2xl sm:text-3xl text-foreground">Profile</h2>

      <Separator />

      <div className="grid sm:grid-cols-2  gap-4 text-sm sm:text-base">
        <div className="space-y-2">
          <p><span className="font-bold">Name:</span> {user?.username}</p>
          <p><span className="font-bold">Email:</span> {user?.email}</p>
          <p><span className="font-bold">Joined:</span> {user && new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="space-y-3">
          <p><span className="font-medium">Total Tests:</span> {user?.results?.length ?? 0}</p>
          <div className="flex gap-4 sm:gap-6">
            {user && (
              <>
                <EditDialog user={user}>
                  <Button variant="outline">Edit</Button>
                </EditDialog>
                <DeleteDialog>
                  <Button variant="destructive">Delete</Button>
                </DeleteDialog>
              </>
            )}
          </div>
        </div>
      </div>
      <Separator />

      <div className="max-w-3xl mx-auto w-full">
        <Results />
      </div>
    </div>
  );
}

