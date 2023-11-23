import { FC, useId } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { getOptInMarketingLabel, getOptInMarketingNote } from "../components/users/UserForm"
import OptInMarketingCheckboxes from "../components/form/OptInMarketingCheckboxes"
import FormElementCustom from "../components/form/FormElementCustom"
import Button from "../components/Button"
import { useUpdateUser } from "../api/users/requests"
import FormError from "../components/form/FormError"

import BasicPage from "./BasicPage"


type WelcomeBackForm = { opt_in_marketing?: boolean }

const WelcomeBack: FC = () => {
  const { mutateAsync: updateUser } = useUpdateUser()
  const navigate = useNavigate()

  const formMethods = useForm<WelcomeBackForm>()
  const { handleSubmit, formState: { isSubmitting, isDirty, errors } } = formMethods

  const onSubmit = ({ opt_in_marketing }: WelcomeBackForm) => {
    updateUser(
      { opt_in_marketing },
      {
        onSuccess: () => navigate("/"),
        onError: (error) => console.error(error)
      }
    )
  }

  const fieldId = useId()

  return (
    <BasicPage title="Velkommen tilbake!" onSubmit={handleSubmit(onSubmit)} containerClassName="gap-16 text-justify">
      <FormProvider {...formMethods}>
        <p>
          Så gøy at du blir med i kodekalenderen vår i år igjen! Det er like
          moro å arrangere hvert år (tross noen sene kvelder for å dra det i
          land) og snart er vi i gang! Du vil motta en e-post når vi legger ut
          den første luken i tilfelle du glemmer at det er blitt desember
          allerede.
        </p>

        <p className="mb-20">
          Vi gleder oss til å se hva slags gøyale løsninger dere kommer på i år.
          Ses i kommentarfeltet! 🧝‍♂🧝‍♀️️🧝🎄
        </p>

        <p>{getOptInMarketingNote(true)}</p>

        <FormElementCustom
          htmlFor={fieldId}
          label={getOptInMarketingLabel()}
          className="text-center col-span-3"
          inputWrapperClassName="mx-auto"
        >
          <OptInMarketingCheckboxes required id={fieldId} />
        </FormElementCustom>
        <FormError error={errors.opt_in_marketing} />

        <Button primary type="submit" disabled={!isDirty || isSubmitting} className="mx-auto" content="Lagre" />
      </FormProvider>
    </BasicPage>
  )
}

export default WelcomeBack
