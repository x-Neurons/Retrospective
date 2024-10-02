import React from 'react'
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SvgIcon from '@mui/material/SvgIcon';
import data from '../Shared/data';

const BrainStorm = () => {

  const [boxesCard1, setBoxesCard1] = useState([]);
  const [boxesCard2, setBoxesCard2] = useState([]);
  const [boxesCard3, setBoxesCard3] = useState([]);
  const [boxesCard4, setBoxesCard4] = useState([]);
  // For the first card
  useEffect(() => {
    const boxInterval = setInterval(() => {
      setBoxesCard1(prev => {
        if (prev.length < 3) {
          return [...prev, {}];
        } else {
          clearInterval(boxInterval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(boxInterval);
  }, []);

  // For the second card
  useEffect(() => {
    const delay = 1000; // Delay in milliseconds (e.g., 5000ms = 5 seconds)

    const timeout = setTimeout(() => {
      const boxInterval = setInterval(() => {
        setBoxesCard2(prev => {
          if (prev.length < 4) {
            return [...prev, {}];
          } else {
            clearInterval(boxInterval);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(boxInterval);
    }, delay);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  // For the Third card
  useEffect(() => {
    const delay = 600;
    const timeout = setTimeout(() => {
      const boxInterval = setInterval(() => {
        setBoxesCard3(prev => {
          if (prev.length < 6) {
            return [...prev, {}];
          } else {
            clearInterval(boxInterval);
            return prev;
          }
        });
      }, 1000);
      return () => clearInterval(boxInterval);
    }, delay);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  // For the Fourth card
  useEffect(() => {
    const delay = 1300; // Delay in milliseconds (e.g., 5000ms = 5 seconds)

    const timeout = setTimeout(() => {
      const boxInterval = setInterval(() => {
        setBoxesCard4(prev => {
          if (prev.length < 2) {
            return [...prev, {}];
          } else {
            clearInterval(boxInterval);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(boxInterval);
    }, delay);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, []);
  
  //For Input Handling
  const [inputValueCard1, setInputValueCard1] = useState('');
  const [inputValuesCard1, setInputValuesCard1] = useState([]);

  const [inputValueCard2, setInputValueCard2] = useState('');
  const [inputValuesCard2, setInputValuesCard2] = useState([]);

  const [inputValueCard3, setInputValueCard3] = useState('');
  const [inputValuesCard3, setInputValuesCard3] = useState([]);

  const [inputValueCard4, setInputValueCard4] = useState('');
  const [inputValuesCard4, setInputValuesCard4] = useState([]);

  // Initialize the data array state
  
  const [allData, setAllData] = useState(() => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : data;
  });
 
  // Handle key press event
  const handleKeyPress = (e, inputValue, setInputValue, setInputValues, inputValues) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default action (e.g., page reload)

      if (typeof inputValue === 'string' && inputValue.trim()) {
        // Determine the category based on the input field
        let category = '';

        if (setInputValue === setInputValueCard1) {
          category = 'lightgreen';
        } 
        else if (setInputValue === setInputValueCard2) {
          category = 'lightpink';
        }
        else if (setInputValue === setInputValueCard3) {
          category = 'lightblue';
        }
        else if (setInputValue === setInputValueCard4) {
          category = '#fcf2a9';
        }

        // Create a new object
        const newId = allData.length ? Math.max(...allData.map(item => item.id)) + 1 : 1;
        const newObject = {
          id: newId,
          text: inputValue.trim(),
          category: category || 'default', // Default category if not Card1 or Card2
          votes: { thumbsUp: 0, thumbsDown: 0, heart: 0, smile: 0 }
        };

        // Add new object to the data array
        setAllData([...allData, newObject]);
        localStorage.setItem('data', JSON.stringify(allData));

        // Update input values for the specific input card
        setInputValues([...inputValues, inputValue]);
        setInputValue(''); // Clear the input field
      }
    }
  };
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(allData));
  }, [allData]); // Run effect when allData changes
  
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, []); // Set original Data on Reload

  return (
    <div className='flex justify-evenly mt-10 gap-5 p-3 md:gap-0 md:p-0 '>

      {/* What went less well CARD */}
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 100, width: 100 }}
            image={`/green-smile-face.svg`}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              What went Well?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Things we are happy about.
            </Typography>
          </CardContent>
        </Card>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '38ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic"
            variant="standard"
            sx={{
              backgroundColor: 'lightyellow',
              borderRadius: '5px',
              '& .MuiInputBase-root': {
                '& input': {
                  height: '35px',
                },
                '&::before': {
                  borderBottom: 'none',
                },
                '&::after': {
                  borderBottom: 'none',
                },
                '&:hover:not(.Mui-disabled)::before': {
                  borderBottom: 'none',
                },
              },
              '&:hover': {
                backgroundColor: '#fcf2a9',
              },
              '& .Mui-focused': {
                backgroundColor: '#fcf2a9',
                borderRadius: '5px',
                border: '2px solid lightblue',
              },
            }}
            value={inputValueCard1}
            onChange={(e) => setInputValueCard1(e.target.value)} // Correctly update the input value
            onKeyDown={(e) => handleKeyPress(e, inputValueCard1, setInputValueCard1, setInputValuesCard1, inputValuesCard1)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon>
                      <svg className="w-6 h-6 text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>

                    </SvgIcon>

                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        {/* Render the New Text Written by the User  */}
        {inputValuesCard1.map((value, index) => (
          <Box
            key={index}
            sx={{
              m: 1,
              width: '38ch',
              height: '39px',
              backgroundColor: 'lightgreen',
              opacity: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'slideDown 0.9s ease-out', // Animation for sliding down
              '@keyframes slideDown': {
                '0%': {
                  transform: 'translateY(-50px)', // Start above the screen
                },
                '100%': {
                  transform: 'translateY(0)', // End at normal position
                },
              },
            }}
          >
            {value}
          </Box>
        ))}

        {/* Hidden Text Boxes */}

        {boxesCard1.map((_, index) => (
          <Box
            key={index} // Unique key for each box
            sx={{
              m: 1,
              width: '38ch',
              height: '39px',
              backgroundColor: 'lightgreen',
              opacity: 0.4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'slideDown 0.5s ease-out', // Animation for sliding down
              '@keyframes slideDown': {
                '0%': {
                  transform: 'translateY(-50px)', // Start above the screen
                },
                '100%': {
                  transform: 'translateY(0)', // End at normal position
                },
              },
            }}
          >
            <SvgIcon
              sx={{
                width: '36px',
                height: '36px',
                color: 'gray',
              }}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </SvgIcon>
          </Box>
        ))}

      </div>

      {/* What went less well CARD */}
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 100, width: 100 }}
            image={`/red-anger-face.svg`}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              What went less well?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Things we should improve.
            </Typography>
          </CardContent>
        </Card>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '38ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic"
            variant="standard"
            sx={{
              backgroundColor: 'lightyellow',
              borderRadius: '5px',
              '& .MuiInputBase-root': {
                '& input': {
                  height: '35px',
                },
                '&::before': {
                  borderBottom: 'none',
                },
                '&::after': {
                  borderBottom: 'none',
                },
                '&:hover:not(.Mui-disabled)::before': {
                  borderBottom: 'none',
                },
              },
              '&:hover': {
                backgroundColor: '#fcf2a9',
              },
              '& .Mui-focused': {
                backgroundColor: '#fcf2a9',
                borderRadius: '5px',
                border: '2px solid lightblue',
              },
            }}
            value={inputValueCard2}
            onChange={(e) => setInputValueCard2(e.target.value)} // Correctly update the input value
            onKeyDown={(e) => handleKeyPress(e, inputValueCard2, setInputValueCard2, setInputValuesCard2, inputValuesCard2)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon>
                      <svg className="w-6 h-6 text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>

                    </SvgIcon>

                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        {/* Render the New Text Written by the User  */}
        {inputValuesCard2.map((value, index) => (
          <Box
            key={index}
            sx={{
              m: 1,
              width: '38ch',
              height: '39px',
              backgroundColor: 'lightpink',
              opacity: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'slideDown 0.9s ease-out', // Animation for sliding down
              '@keyframes slideDown': {
                '0%': {
                  transform: 'translateY(-50px)', // Start above the screen
                },
                '100%': {
                  transform: 'translateY(0)', // End at normal position
                },
              },
            }}
          >
            {value}
          </Box>
        ))}
        {/* Hidden Text Boxes */}
        {boxesCard2.map((_, index) => (
          <Box
            key={index} // Unique key for each box
            sx={{
              m: 1,
              width: '38ch',
              height: '39px',
              backgroundColor: 'lightpink',
              opacity: 0.4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'slideDown 0.5s ease-out', // Animation for sliding down
              '@keyframes slideDown': {
                '0%': {
                  transform: 'translateY(-50px)', // Start above the screen
                },
                '100%': {
                  transform: 'translateY(0)', // End at normal position
                },
              },
            }}
          >
            <SvgIcon
              sx={{
                width: '36px',
                height: '36px',
                color: 'gray',
              }}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </SvgIcon>
          </Box>
        ))}
      </div>

      {/* What do we want to try next CARD */}
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 100, width: 100 }}
            image={`/blue-bulb.svg`}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              What do we want to try next?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Things we should do differently.
            </Typography>
          </CardContent>
        </Card>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '38ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic"
            variant="standard"
            sx={{
              backgroundColor: 'lightyellow',
              borderRadius: '5px',
              '& .MuiInputBase-root': {
                '& input': {
                  height: '35px',
                },
                '&::before': {
                  borderBottom: 'none',
                },
                '&::after': {
                  borderBottom: 'none',
                },
                '&:hover:not(.Mui-disabled)::before': {
                  borderBottom: 'none',
                },
              },
              '&:hover': {
                backgroundColor: '#fcf2a9',
              },
              '& .Mui-focused': {
                backgroundColor: '#fcf2a9',
                borderRadius: '5px',
                border: '2px solid lightblue',
              },
            }}
            value={inputValueCard3}
            onChange={(e) => setInputValueCard3(e.target.value)} // Correctly update the input value
            onKeyDown={(e) => handleKeyPress(e, inputValueCard3, setInputValueCard3, setInputValuesCard3, inputValuesCard3)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon>
                      <svg className="w-6 h-6 text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>

                    </SvgIcon>

                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Render the New Text Written by the User  */}
        {inputValuesCard3.map((value, index) => (
          <Box
            key={index}
            sx={{
              m: 1,
              width: '38ch',
              height: '39px',
              backgroundColor: 'lightblue',
              opacity: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'slideDown 0.9s ease-out', // Animation for sliding down
              '@keyframes slideDown': {
                '0%': {
                  transform: 'translateY(-50px)', // Start above the screen
                },
                '100%': {
                  transform: 'translateY(0)', // End at normal position
                },
              },
            }}
          >
            {value}
          </Box>
        ))}

        {/* Hidden Text Boxes */}

        {boxesCard3.map((_, index) => (
          <Box
            key={index} // Unique key for each box
            sx={{
              m: 1,
              width: '38ch',
              height: '39px',
              backgroundColor: 'lightblue',
              opacity: 0.4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'slideDown 0.5s ease-out forwards', // Animation for sliding down
              '@keyframes slideDown': {
                '0%': {
                  transform: 'translateY(-50px)', // Start above the screen
                },
                '100%': {
                  transform: 'translateY(0)', // End at normal position
                },
              },
            }}
          >
            <SvgIcon
              sx={{
                width: '36px',
                height: '36px',
                color: 'gray',
              }}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </SvgIcon>
          </Box>
        ))}
      </div>

      {/* What puzzels us CARD  */}
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 100, width: 100 }}
            image={`/orange-alert.svg`}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              What puzzels us?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Unanswered questions we have
            </Typography>
          </CardContent>
        </Card>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '38ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic"
            variant="standard"
            sx={{
              backgroundColor: 'lightyellow',
              borderRadius: '5px',
              '& .MuiInputBase-root': {
                '& input': {
                  height: '35px',
                },
                '&::before': {
                  borderBottom: 'none',
                },
                '&::after': {
                  borderBottom: 'none',
                },
                '&:hover:not(.Mui-disabled)::before': {
                  borderBottom: 'none',
                },
              },
              '&:hover': {
                backgroundColor: '#fcf2a9',
              },
              '& .Mui-focused': {
                backgroundColor: '#fcf2a9',
                borderRadius: '5px',
                border: '2px solid lightblue',
              },
            }}
            value={inputValueCard4}
            onChange={(e) => setInputValueCard4(e.target.value)} // Correctly update the input value
            onKeyDown={(e) => handleKeyPress(e, inputValueCard4, setInputValueCard4, setInputValuesCard4, inputValuesCard4)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon>
                      <svg className="w-6 h-6 text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>

                    </SvgIcon>

                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        {/* Render the New Text Written by the User  */}
        {inputValuesCard4.map((value, index) => (
          <Box
            key={index}
            sx={{
              m: 1,
              width: '38ch',
              height: '39px',
              backgroundColor: '#fcf2a9',
              opacity: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'slideDown 0.9s ease-out', // Animation for sliding down
              '@keyframes slideDown': {
                '0%': {
                  transform: 'translateY(-50px)', // Start above the screen
                },
                '100%': {
                  transform: 'translateY(0)', // End at normal position
                },
              },
            }}
          >
            {value}
          </Box>
        ))}

        {/* Hidden Text Boxes */}

        {boxesCard4.map((_, index) => (
          <Box
            key={index} // Unique key for each box
            sx={{
              m: 1,
              width: '38ch',
              height: '39px',
              backgroundColor: '#fcdd88',
              opacity: 0.4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'slideDown 0.5s ease-out forwards', // Animation for sliding down
              '@keyframes slideDown': {
                '0%': {
                  transform: 'translateY(-50px)', // Start above the screen
                },
                '100%': {
                  transform: 'translateY(0)', // End at normal position
                },
              },
            }}
          >
            <SvgIcon
              sx={{
                width: '36px',
                height: '36px',
                color: 'gray',
              }}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </SvgIcon>
          </Box>
        ))}
      </div>

    </div>
  )
}

export default BrainStorm


