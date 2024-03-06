import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/Admin/DataTable";
import { Layout } from "@/components/Admin/Layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/utils/api";
import { abilitieColumns } from "@/components/Admin/DataTable/components/columns/abilitieColumns";
import { toast } from "@/components/ui/use-toast";

export default function Programacoes() {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { id } = router.query as { id: string };
  const { data } = api.abilitie.getAll.useQuery();
  const { mutate } = api.abilitie.delete.useMutation();
  const utils = api.useUtils();

  const handleCloseDeleteModal = async (value: boolean) => {
    if (!value) {
      await router.push(
        { pathname: router.pathname, query: { ...router.query, id: "" } },
        undefined,
        { shallow: true },
      );
    }
    setOpenDeleteModal(value);
  };

  const handleDelete = async () => {
    try {
      mutate(
        {
          id: Number(id),
        },
        {
          onSuccess: () => {
            toast({
              title: "Sucesso",
              description: "Habilidade deletada com sucesso.",
            });
          },
        },
      );
      setOpenDeleteModal(false);
      await utils.project.getAll.invalidate();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao deletar a habilidade.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!!id && id.trim()) {
      setOpenDeleteModal(true);
    }
  }, [id]);

  return (
    <Layout>
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col gap-2 p-4">
          <div>
            <Button className="w">
              <Link href="/admin/habilidades/create">Nova Habilidade</Link>
            </Button>
          </div>

          {data && <DataTable data={data} columns={abilitieColumns} />}
        </div>
      </TooltipProvider>
      <AlertDialog open={openDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente a
              programação.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleCloseDeleteModal(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
