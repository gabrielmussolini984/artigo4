1. Crie o cluster GKE
  > gcloud config set project ID_PROJETO gcloud config set ZONA
  > gcloud container clusters create NOME_DO_CLUSTER
  > gcloud container clusters get-credentials NOME_DO_CLUSTER

2. Crie um service account pela linha de comando ou no site.
  > gcloud iam service-accounts create github --description="processo de cd dev" --display-name="github-dev"

4. Limitando acesso aos recursos pelo IAM Google
  > gcloud projects add-iam-policy-binding eventh-capsule-293317 --member="serviceAccount:github@seventh-capsule-293317.iam.           gserviceaccount.com" --role="roles/editor"

5. Para verificar as contas de serviços criadas:
  > gcloud iam service-accounts list

6. Exportar as chaves da conta de serviço em json:
  > gcloud iam service-accounts keys create ~/key.json --iam-account github@seventh-capsule-293317.iam.gserviceaccount.com

7. Crie duas secrets no github:
  > GKE_PROJECT: Id do projeto
  > GKE_SA_KEY: Chave da conta de serviço

8. Edite o workflow de acordo com sua necessidade.
  > .github/workflows/backend.dev.yml


# Criando PV

1. Crie o volume no gclouyd
  > gcloud compute disks create --size=500GB --zone=us-central1-a my-data-disk

2. Crie o PVC
  >

3. E o pod que utilizará esse pvc
