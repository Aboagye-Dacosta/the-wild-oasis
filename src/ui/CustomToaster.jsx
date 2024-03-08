import { ToastBar, Toaster, toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

const Icon = styled(IoMdClose)`
  font-size: 2rem;
  z-index: 50;
`;

const IconHolder = styled.span`
  display: inline-block;
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 50;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-grey-200);
    transition: opacity 0.5s ease;
    opacity: 0;
    z-index: -1;
  }

  &:hover&::before {
    opacity: 1;
  }
`;

function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{
        margin: "8px",
      }}
      toastOptions={{
        success: {
          duration: 3000,
          style: {
            backgroundColor: "var(--color-green-100)",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: " var(--color-red-100)",
          },
        },
        style: {
          backgroundColor: "var(--color-grey-0)",
          fontSize: "16px",
          color: "var(--color-grey-700)",
          maxWidth: "500px",
          padding: "16px 24px",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              <IconHolder>
                <Icon onClick={() => toast.dismiss(t.id)} />
              </IconHolder>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default CustomToaster;
