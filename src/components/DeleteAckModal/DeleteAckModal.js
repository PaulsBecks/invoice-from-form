import React, { useState } from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";

export default function DelteAckModal(props) {
  const { onDelete, type } = props;
  const [open, setOpen] = useState(false);

  return (
    <Modal
      {...props}
      basic
      size="small"
      trigger={<Button negative icon="trash" onClick={() => setOpen(true)} />}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Header icon="trash" content={`${type} löschen`} />
      <Modal.Content>
        <p>Bist du dir sicher, dass du dieses Element löschen willst?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> Nein
        </Button>
        <Button
          color="green"
          inverted
          onClick={() => {
            onDelete();
            setOpen(false);
          }}
        >
          <Icon name="checkmark" /> Ja
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
