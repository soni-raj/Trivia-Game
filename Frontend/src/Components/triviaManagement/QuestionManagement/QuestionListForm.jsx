import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import QuestionModal from './QuestionModal';

const QuestionListForm = ({ questions, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState({
    question: '',
    category: '',
    difficulty_level: '',
    options: ['', ''],
    correct_answer: '',
  });

  const handleOpenModal = (questionData) => {
    setEditingQuestion(questionData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = (questionData) => {
    onSave(questionData);
    handleCloseModal();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal(null)}
        sx={{ m: 2 }}
      >
        Add Question
      </Button>

      <QuestionModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveQuestion}
        initialData={editingQuestion}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.category}</TableCell>
                <TableCell>{question.difficulty_level}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(question)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDelete(question.question_id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuestionListForm;
