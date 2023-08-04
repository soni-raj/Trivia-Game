import React, { useState, useEffect } from 'react';
import {
  Modal,
  Fade,
  TextField,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import './QuestionModal.css';

const QuestionModal = ({ open, onClose, onSave, initialData }) => {
  const [questionData, setQuestionData] = useState({
    question: '',
    category: '',
    difficulty_level: '',
    options: ['', ''],
    correct_answer: '',
  });

  useEffect(() => {
    if (initialData) {
      setQuestionData(initialData);
      console.log(questionData);
    } else {
      resetQuestionData();
    }
  }, [initialData]);

  const resetQuestionData = () => {
    setQuestionData({
      question: '',
      category: '',
      difficulty_level: '',
      options: ['', ''],
      correct_answer: '',
    });
  };

  const handleAddOption = () => {
    setQuestionData((prevData) => ({
      ...prevData,
      options: [...prevData.options, ''],
    }));
  };

  const handleRemoveOption = (index) => {
    setQuestionData((prevData) => {
      const updatedOptions = [...prevData.options];
      updatedOptions.splice(index, 1);
      return {
        ...prevData,
        options: updatedOptions,
      };
    });
  };

  const handleOptionChange = (index, value) => {
    setQuestionData((prevData) => {
      const updatedOptions = [...prevData.options];
      updatedOptions[index] = value;
      return {
        ...prevData,
        options: updatedOptions,
      };
    });
  };

  const handleSave = () => {
    console.log("Save");
    onSave(questionData);
    resetQuestionData();
    onClose();
  };

  const handleEdit = () => {
    console.log("EDIt");
    onSave(questionData);
    resetQuestionData();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <div className="modal-container">
          <div className="modal-content">
            <TextField
              label="Question"
              value={questionData.question}
              onChange={(e) =>
                setQuestionData({ ...questionData, question: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              value={questionData.category}
              onChange={(e) =>
                setQuestionData({ ...questionData, category: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Difficulty"
              value={questionData.difficulty_level}
              onChange={(e) =>
                setQuestionData({ ...questionData, difficulty_level: e.target.value })
              }
              fullWidth
              margin="normal"
            />

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Options</FormLabel>
              {questionData.options.map((option, index) => (
                <div key={index}>
                  <TextField
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    fullWidth
                    margin="normal"
                  />

                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove Option
                  </Button>

                </div>
              ))}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddOption}
                sx={{ mt: 2 }}
              >
                Add Option
              </Button>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="correct-answer-select">
                Correct Answer
              </InputLabel>
              <Select
                label="Correct Answer"
                id="correct-answer-select"
                value={questionData.correct_answer}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    correct_answer: e.target.value,
                  })
                }
              >
                {questionData.options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={() => {initialData ? handleEdit() : handleSave()}}>
                {initialData ? 'Save Question' : 'Add Question'}
              </Button>
              <Button variant="contained" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default QuestionModal;
