import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import db from "../lib/firebase";

const AddNewPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const initialRef = React.useRef();

  const handleSubmit = async () => {
    setIsSaving(true);
    const date = new Date();
    await db.collection("posts").add({
      title,
      upVotesCount: 0,
      downVotesCount: 0,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    });
    setIsSaving(false);
    onClose();
    setTitle("");
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" alignSelf>
        Add new Post
      </Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add new post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="postTitle">
                <FormLabel>Post Title</FormLabel>
                <Textarea
                  ref={initialRef}
                  type="postTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button onClick={onClose}>Close</Button>
                <Button
                  onClick={handleSubmit}
                  colorScheme="blue"
                  disabled={!title.trim()}
                  isLoading={isSaving}
                >
                  Save
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default AddNewPost;
