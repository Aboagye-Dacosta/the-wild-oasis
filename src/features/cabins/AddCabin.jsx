import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-modal">
          <Button>Add Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-modal">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isCabinOpen, setIsCabinOpen] = useState(false);
//   return (
//     <div>
//       {isCabinOpen && (
//         <Modal closeModal={() => setIsCabinOpen(false)}>
//           <CreateCabinForm closeModal={() => setIsCabinOpen(false)} />
//         </Modal>
//       )}
//       <Button onClick={() => setIsCabinOpen((showForm) => !showForm)}>
//         Create a cabin
//       </Button>
//     </div>
//   );
// }

export default AddCabin;
