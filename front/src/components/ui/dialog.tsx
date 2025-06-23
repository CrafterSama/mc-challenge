import {
  CloseButton,
  Dialog as DialogComponent,
  Portal,
} from "@chakra-ui/react";

const Dialog = ({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <DialogComponent.Root lazyMount open={open} onOpenChange={onOpenChange}>
      <Portal>
        <DialogComponent.Backdrop />
        <DialogComponent.Positioner>
          <DialogComponent.Content borderRadius="lg">
            <DialogComponent.Header>
              <DialogComponent.Title>{title}</DialogComponent.Title>
            </DialogComponent.Header>
            <DialogComponent.Body>{children}</DialogComponent.Body>
            <DialogComponent.CloseTrigger asChild>
              <CloseButton size="sm" />
            </DialogComponent.CloseTrigger>
          </DialogComponent.Content>
        </DialogComponent.Positioner>
      </Portal>
    </DialogComponent.Root>
  );
};

export default Dialog;
