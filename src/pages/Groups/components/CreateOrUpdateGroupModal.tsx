import CustomButton from "@/components/common/CustomButton";
import CustomTextarea from "@/components/common/CustomTextarea";
import CustomInput from "@/components/common/NewCharkaInput";
import { useGroupAction } from "@/hooks/Groups/useActionGroup";
import { useCreateNewGroupSchema } from "@/utils/validationSchema";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { TFunction } from "i18next";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Group } from "../GroupsManagement";

interface CreateOrUpdateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TFunction;
  group?: Group;
}

/**
 * Create New Group Modal component to create a new group
 */
const CreateOrUpdateGroupModal: React.FC<CreateOrUpdateGroupModalProps> = ({
  isOpen,
  onClose,
  t,
  group,
}) => {
  const schema = useCreateNewGroupSchema();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  // Mutation to create a new group
  const { mutate: actionGroup, isPending } = useGroupAction(onClose);

  // Handle form submit
  const handleSubmitForm = async (data: {
    title: string;
    description?: string;
  }) => {
    if (group) {
      actionGroup({ data, type: "update", id: group._id });
    } else {
      actionGroup({ data, type: "create" });
    }
  };

  // Set the group title in the form
  useEffect(() => {
    if (group) {
      methods.setValue("title", group.title);
      methods.setValue("description", group.description);
    }

    return () => {
      methods.reset();
    };
  }, [group, methods]);

  return (
    <>
      {/* Create menu modal */}
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={onClose}
        size={{ base: "sm", md: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent
          p={6}
          sx={{
            borderRadius: "0.75rem",
          }}
        >
          <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
            <h4 className="text-xl font-semibold md:text-xl">
              {group ? t("editGroup") : t("addNewGroup")}
            </h4>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "0px 0px" }}>
            <FormProvider {...methods}>
              <form
                className="mt-4 flex select-none flex-col gap-3"
                onSubmit={methods.handleSubmit(handleSubmitForm)}
              >
                {/* Description text */}
                {!group && (
                  <p className="mb-2 text-center text-sm">
                    {t("createNewGroupDescription")}
                  </p>
                )}
                {/* Meal title */}
                <CustomInput name="title" label={t("selectGroupName")} />

                {/* Meal description */}
                <CustomTextarea
                  name="description"
                  label={t("common:description")}
                />

                <div className="mt-2 flex items-center gap-3">
                  <CustomButton
                    text={t("common:cancel")}
                    onClick={onClose}
                    type="dark"
                    widthFull={true}
                    paddingY="py-3"
                  />
                  <CustomButton
                    text={group ? t("common:update") : t("common:create")}
                    actionType="submit"
                    loading={isPending}
                    loadingSpinner={false}
                    widthFull={true}
                    paddingY="py-3"
                  />
                </div>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateOrUpdateGroupModal;
