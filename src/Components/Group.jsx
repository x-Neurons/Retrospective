import React from 'react'
import { useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Group = () => {

    // State to hold the data retrieved from local storage
    const [data, setData] = useState([])
    const [editingId, setEditingId] = useState(null); // State to track which item is being edited
    const [editingText, setEditingText] = useState(''); // State to hold the text being edited

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Retrieve data from local storage on component mount
    useEffect(() => {
        const storedData = localStorage.getItem('data');
        if (storedData) {
            try {
                setData(JSON.parse(storedData));
            } catch (error) {
                console.error("Error parsing data from localStorage", error);
            }
        }
    }, []);

    // Update local storage whenever data changes
    useEffect(() => {
        // Check if data is not empty before saving to localStorage
        if (data.length > 0) {
            localStorage.setItem('data', JSON.stringify(data));
        } else {
            // Remove data from local storage if empty
            localStorage.removeItem('data');
        }
    }, [data]);

    const updateThumbsUp = (e, id) => {
        e.stopPropagation();
        setData(prevData => {
            return prevData.map(item => {
                if (item.id === id) {
                    

                    // Convert thumbsUp to a number and increment it
                    const currentThumbsUp = Number(item.votes.thumbsUp) || 0; // Fallback to 0 if NaN
                    return {
                        ...item,
                        votes: {
                            ...item.votes,
                            thumbsUp: currentThumbsUp + 1
                        }
                    };
                }
                return item;
            });
        });
    };
    const updateThumbsDown = (e, id) => {
        e.stopPropagation();
        setData(prevData => {
            return prevData.map(item => {
                if (item.id === id) {

                    // Convert thumbsUp to a number and increment it
                    const currentThumbsDown = Number(item.votes.thumbsDown) || 0; // Fallback to 0 if NaN
                    return {
                        ...item,
                        votes: {
                            ...item.votes,
                            thumbsDown: currentThumbsDown + 1
                        }
                    };
                }
                return item;
            });
        });
    };
    const updateHeart = (e, id) => {
        e.stopPropagation();
        setData(prevData => {
            return prevData.map(item => {
                if (item.id === id) {

                    // Convert thumbsUp to a number and increment it
                    const currentHeart = Number(item.votes.heart) || 0; // Fallback to 0 if NaN
                    return {
                        ...item,
                        votes: {
                            ...item.votes,
                            heart: currentHeart + 1
                        }
                    };
                }
                return item;
            });
        });
    };
    const updateSmile = (e, id) => {
        e.stopPropagation();
        setData(prevData => {
            return prevData.map(item => {
                if (item.id === id) {

                    // Convert thumbsUp to a number and increment it
                    const currentSmile = Number(item.votes.smile) || 0; // Fallback to 0 if NaN
                    return {
                        ...item,
                        votes: {
                            ...item.votes,
                            smile: currentSmile + 1
                        }
                    };
                }
                return item;
            });
        });
    };

    const [thumbsUpHovered, setThumbsUpHovered] = useState(null); // State to track hover
    const [thumbsDownHovered, setThumbsDownHovered] = useState(null); // State to track hover
    const [heartHovered, setHeartHovered] = useState(null); // State to track hover
    const [smileHovered, setSmileHovered] = useState(null); // State to track hover

    //Delete Logic
    const handleDelete = (id) => {
        
        const updatedUsers = data.filter(item => item.id !== id);

        // Update state and local storage
        setData(updatedUsers);
        localStorage.setItem('data', JSON.stringify(updatedUsers));
    }

    // Handle edit action
    const handleEditClick = (item) => {
        setEditingId(item.id); // Set the ID of the item being edited
        setEditingText(item.text); // Set the current text for editing
    };
    //Save Logic
    const handleSaveEdit = () => {
        const updatedData = data.map(item =>
            item.id === editingId ? { ...item, text: editingText } : item
        );
        setData(updatedData);
        setEditingId(null); // Reset editing ID
        setEditingText(''); // Reset editing text
    };

    // Custom Next Arrow Component
    const NextArrow = ({ onClick }) => (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                },
            }}
        >
            <ArrowForwardIos sx={{ color: 'white' }} />
        </IconButton>
    );

    // Custom Previous Arrow Component
    const PrevArrow = ({ onClick }) => (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                },
            }}
        >
            <ArrowBackIos sx={{ color: 'white' }} />
        </IconButton>
    );
    //Slider/Carousel Settings
    const settings = {
        className: "center",
        infinite: false, // Enable infinite scrolling for smoother behavior
        slidesToShow: 3, // Show 3 slides on large screens
        speed: 500,
        dots: true, // Show dots for navigation
        slidesToScroll: 1,
        arrows: true, // Enable arrows
        nextArrow: <NextArrow />, // Use custom next arrow
        prevArrow: <PrevArrow />, // Use custom prev arrow
        centerMode: true, // Disable center mode entirely
        responsive: [
            {
                breakpoint: 768, // Screen width below 768px (small screens)
                settings: {
                    slidesToShow: 1, // Show only 1 slide on small screens
                    slidesToScroll: 1,
                    dots: false, // Optionally hide dots on small screens
                    infinite: true, // Ensure infinite scrolling on mobile as well
                    centerMode: false,
                }
            }
        ]
    };

    //Drag and Drop
    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('draggedIndex', index);
        // console.log('DragStart',index)
    };

    const handleDrop = (event, dropIndex) => {
        // console.log('Drop',dropIndex)
        const draggedIndex = event.dataTransfer.getData('draggedIndex');
        if (draggedIndex === '') return;

        // Simple reordering logic for now (optional if no reordering needed)
        const updatedData = [...data];
        const draggedItem = updatedData.splice(draggedIndex, 1)[0];
        updatedData.splice(dropIndex, 0, draggedItem);
        setData(updatedData);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    //Count Boxes in Cards
    let boxesCard1 = 0;
    let boxesCard2 = 0;
    let boxesCard3 = 0;
    let boxesCard4 = 0;

    return (
        <DndProvider backend={HTML5Backend}>
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

                    {/* Render All the text  */}

                    {data
                        .slice() // Create a shallow copy of the array to avoid mutating the original data
                        .filter(item => item.category === 'lightgreen') // Filter items with category 'lightgreen'
                        .map((item, index) => (
                            <React.Fragment>
                                {/* just to calculate how many boxes in this category  */}
                                <div className='hidden'>{boxesCard1++}</div>

                                <div key={item.id}>
                                    <Box onClick={handleClickOpen}
                                        draggable // Make the Box draggable
                                        onDragStart={(event) => handleDragStart(event, index)} // Triggered when drag starts
                                        onDragOver={handleDragOver} // Triggered when dragging over another element (required to allow drop)
                                        onDrop={(event) => handleDrop(event, index)} // Triggered when the item is dropped
                                        sx={{
                                            m: 1,
                                            paddingTop: 1,
                                            width: '38ch',
                                            height: 'auto',
                                            backgroundColor: item.category, // Dynamically set background color
                                            opacity: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            animation: 'zoomIn 0.9s ease-out',
                                            '@keyframes zoomIn': {
                                                '0%': {
                                                    opacity: '0',
                                                    transform: 'scale(0.9)', /* Slight zoom-in effect */
                                                },
                                                '100%': {
                                                    opacity: '1',
                                                    transform: 'scale(1)', /* Original size */
                                                }
                                            },
                                        }}
                                    >
                                        {item.text}
                                        <div className='flex m-1 items-center w-1/2 justify-around'>
                                            <svg onClick={(e) => updateThumbsUp(e, item.id)}
                                                className="w-6 h-6 text-green-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150 
                                    " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setThumbsUpHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setThumbsUpHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                                            </svg>
                                            {/* Conditionally render thumbsUp count on hover */}
                                            {thumbsUpHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.thumbsUp}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateThumbsDown(e, item.id)} className="w-6 h-6 text-black dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setThumbsDownHovered(item.id)}
                                                onMouseLeave={() => setThumbsDownHovered(null)}
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                                            </svg>
                                            {thumbsDownHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.thumbsDown}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateHeart(e, item.id)} className="w-6 h-6 text-red-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setHeartHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setHeartHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                            </svg>
                                            {heartHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.heart}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateSmile(e, item.id)} className="w-6 h-6 text-yellow-500 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setSmileHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setSmileHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
                                            </svg>
                                            {smileHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.smile}
                                                </p>
                                            )}
                                        </div>

                                    </Box>
                                </div>
                            </React.Fragment>
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
                                What went less
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Things we should improve.
                            </Typography>
                        </CardContent>
                    </Card>
                    {/* Render the New Text Written by the User  */}
                    {data
                        .slice() // Create a shallow copy of the array to avoid mutating the original data
                        .filter(item => item.category === 'lightpink') // Filter items with category 'lightgreen'
                        .map((item, index) => (
                            <React.Fragment>
                                {/* just to calculate how many boxes in this category  */}
                                <div className='hidden'>{boxesCard2++}</div>
                                <div key={item.id}>
                                    <Box onClick={handleClickOpen}
                                        draggable // Make the Box draggable
                                        onDragStart={(event) => handleDragStart(event, index + boxesCard1)} // Triggered when drag starts
                                        onDragOver={handleDragOver} // Triggered when dragging over another element (required to allow drop)
                                        onDrop={(event) => handleDrop(event, index + boxesCard1)} // Triggered when the item is dropped
                                        sx={{
                                            m: 1,
                                            paddingTop: 1,
                                            width: '38ch',
                                            height: 'auto',
                                            backgroundColor: item.category, // Dynamically set background color
                                            opacity: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            animation: 'zoomIn 0.9s ease-out',
                                            '@keyframes zoomIn': {
                                                '0%': {
                                                    opacity: '0',
                                                    transform: 'scale(0.9)', /* Slight zoom-in effect */
                                                },
                                                '100%': {
                                                    opacity: '1',
                                                    transform: 'scale(1)', /* Original size */
                                                }
                                            },
                                        }}
                                    >
                                        {item.text}
                                        <div className='flex m-1 items-center w-1/2 justify-around'>
                                            <svg onClick={(e) => updateThumbsUp(e, item.id)}
                                                className="w-6 h-6 text-green-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150 
                                    " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setThumbsUpHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setThumbsUpHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                                            </svg>
                                            {/* Conditionally render thumbsUp count on hover */}
                                            {thumbsUpHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.thumbsUp}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateThumbsDown(e, item.id)} className="w-6 h-6 text-black dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setThumbsDownHovered(item.id)}
                                                onMouseLeave={() => setThumbsDownHovered(null)}
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                                            </svg>
                                            {thumbsDownHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.thumbsDown}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateHeart(e, item.id)} className="w-6 h-6 text-red-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setHeartHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setHeartHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                            </svg>
                                            {heartHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.heart}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateSmile(e, item.id)} className="w-6 h-6 text-yellow-500 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setSmileHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setSmileHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
                                            </svg>
                                            {smileHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.smile}
                                                </p>
                                            )}
                                        </div>
                                    </Box>

                                </div>
                            </React.Fragment>
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


                    {/* Render the New Text Written by the User  */}
                    {data
                        .slice() // Create a shallow copy of the array to avoid mutating the original data
                        .filter(item => item.category === 'lightblue') // Filter items with category 'lightgreen'
                        .map((item, index) => (
                            <React.Fragment>
                            {/* Just to count Cards  */}
                                <div className='hidden'>{boxesCard3++}</div>
                                <div key={item.id}>
                                    <Box onClick={handleClickOpen}
                                        draggable // Make the Box draggable
                                        onDragStart={(event) => handleDragStart(event, index + boxesCard1 + boxesCard2)} // Triggered when drag starts
                                        onDragOver={handleDragOver} // Triggered when dragging over another element (required to allow drop)
                                        onDrop={(event) => handleDrop(event, index + boxesCard1 + boxesCard2)} // Triggered when the item is dropped
                                        sx={{
                                            m: 1,
                                            paddingTop: 1,
                                            width: '38ch',
                                            height: 'auto',
                                            backgroundColor: item.category, // Dynamically set background color
                                            opacity: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            animation: 'zoomIn 0.9s ease-out',
                                            '@keyframes zoomIn': {
                                                '0%': {
                                                    opacity: '0',
                                                    transform: 'scale(0.9)', /* Slight zoom-in effect */
                                                },
                                                '100%': {
                                                    opacity: '1',
                                                    transform: 'scale(1)', /* Original size */
                                                }
                                            },
                                        }}
                                    >
                                        {item.text}
                                        <div className='flex m-1 items-center w-1/2 justify-around'>
                                            <svg onClick={(e) => updateThumbsUp(e, item.id)}
                                                className="w-6 h-6 text-green-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150 
                                    " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setThumbsUpHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setThumbsUpHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                                            </svg>
                                            {/* Conditionally render thumbsUp count on hover */}
                                            {thumbsUpHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.thumbsUp}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateThumbsDown(e, item.id)} className="w-6 h-6 text-black dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setThumbsDownHovered(item.id)}
                                                onMouseLeave={() => setThumbsDownHovered(null)}
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                                            </svg>
                                            {thumbsDownHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.thumbsDown}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateHeart(e, item.id)} className="w-6 h-6 text-red-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setHeartHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setHeartHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                            </svg>
                                            {heartHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.heart}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateSmile(e, item.id)} className="w-6 h-6 text-yellow-500 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setSmileHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setSmileHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
                                            </svg>
                                            {smileHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.smile}
                                                </p>
                                            )}
                                        </div>
                                    </Box>

                                </div>
                            </React.Fragment>
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

                    {/* Render the New Text Written by the User  */}
                    {data
                        .slice() // Create a shallow copy of the array to avoid mutating the original data
                        .filter(item => item.category === '#fcf2a9') // Filter items with category 'lightgreen'
                        .map((item, index) => (
                            <React.Fragment>
                            {/* Just to count cards */}
                                <div className='hidden'>{boxesCard4++}</div>
                                <div key={item.id}>
                                    <Box onClick={handleClickOpen}
                                        draggable // Make the Box draggable
                                        onDragStart={(event) => handleDragStart(event, index + boxesCard1 + boxesCard2 + boxesCard3)} // Triggered when drag starts
                                        onDragOver={handleDragOver} // Triggered when dragging over another element (required to allow drop)
                                        onDrop={(event) => handleDrop(event, index + boxesCard1 + boxesCard2 + boxesCard3)} // Triggered when the item is dropped
                                        sx={{
                                            m: 1,
                                            paddingTop: 1,
                                            width: '38ch',
                                            height: 'auto',
                                            backgroundColor: item.category, // Dynamically set background color
                                            opacity: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            animation: 'zoomIn 0.9s ease-out',
                                            '@keyframes zoomIn': {
                                                '0%': {
                                                    opacity: '0',
                                                    transform: 'scale(0.9)', /* Slight zoom-in effect */
                                                },
                                                '100%': {
                                                    opacity: '1',
                                                    transform: 'scale(1)', /* Original size */
                                                }
                                            },
                                        }}
                                    >
                                        {item.text}
                                        <div className='flex m-1 items-center w-1/2 justify-around'>
                                            <svg onClick={(e) => updateThumbsUp(e, item.id)}
                                                className="w-6 h-6 text-green-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150 
                                    " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setThumbsUpHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setThumbsUpHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                                            </svg>
                                            {/* Conditionally render thumbsUp count on hover */}
                                            {thumbsUpHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.thumbsUp}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateThumbsDown(e, item.id)} className="w-6 h-6 text-black dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setThumbsDownHovered(item.id)}
                                                onMouseLeave={() => setThumbsDownHovered(null)}
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                                            </svg>
                                            {thumbsDownHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.thumbsDown}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateHeart(e, item.id)} className="w-6 h-6 text-red-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setHeartHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setHeartHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                            </svg>
                                            {heartHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.heart}
                                                </p>
                                            )}
                                            <svg onClick={(e) => updateSmile(e, item.id)} className="w-6 h-6 text-yellow-500 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                onMouseEnter={() => setSmileHovered(item.id)}  // Show hover state
                                                onMouseLeave={() => setSmileHovered(null)} // Hide hover state 
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
                                            </svg>
                                            {smileHovered === item.id && (
                                                <p className='text-sm -m-1'>
                                                    {item.votes.smile}
                                                </p>
                                            )}
                                        </div>
                                    </Box>
                                </div>
                            </React.Fragment>
                        ))}
                </div>

            </div>

            {/* Pop Up Design Using Slick  */}
            <div className={`w-full h-screen absolute z-[1300] top-0 ${open ? 'block' : 'hidden'} `}>
                <div className='absolute w-full h-full bg-white opacity-70'></div>
                <div className="slider-container m-auto h-full w-full items-center ">
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            right: '16px',
                            top: '16px',
                            backgroundColor: 'white',
                            color: 'red',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            fontSize: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                            zIndex: 2000, // Ensure the button is above other content
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.backgroundColor = 'red';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'red';
                        }}
                    >
                        X
                    </button>
                    <Slider {...settings} className='h-full'>
                        {data.map((item) => (
                            <div key={item.id} className='w-full h-full mt-[50%]'> {/* Each item as a slide */}
                                <Box
                                    sx={{
                                        m: 'auto',
                                        paddingTop: '40px',
                                        paddingBottom: '4px',
                                        paddingLeft: '40px',
                                        paddingRight: '40px',
                                        width: { xs: '95%', md: '90%', lg: '90%' }, // Control the width of each box
                                        height: '200px',
                                        fontSize: '25px',
                                        backgroundColor: item.category,
                                        opacity: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'evenly',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        animation: 'zoomIn 0.9s ease-out',
                                        '@keyframes zoomIn': {
                                            '0%': {
                                                opacity: '0',
                                                transform: 'scale(0.9)', /* Slight zoom-in effect */
                                            },
                                            '100%': {
                                                opacity: '1',
                                                transform: 'scale(1)', /* Original size */
                                            }
                                        },
                                    }}
                                >
                                    {/* Inside Box content */}
                                    <div className='w-[450px] flex justify-around xs:justify-center sm:justify-center md:justify-center md:text-xl lg:text-2xl'>
                                        {editingId === item.id ? (
                                            <TextField
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                                sx={{ mb: 1 }}
                                            />
                                        ) : (
                                            <span className='inline-block'>{item.text}</span>
                                        )}
                                        <span className='flex'>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDelete(item.id)}
                                                sx={{
                                                    color: 'red',
                                                    transition: 'transform 0.3s, color 0.3s',
                                                    marginRight: '5px',
                                                    '&:hover': {
                                                        transform: 'scale(1.5)',
                                                        color: 'red',
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            {editingId === item.id ? (
                                                <Button
                                                    variant="contained"
                                                    onClick={handleSaveEdit}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: "green",
                                                        borderColor: 'green',
                                                        transition: 'transform 0.3s, color 0.3s',
                                                        '&:hover': {
                                                            backgroundColor: 'darkgreen',
                                                            transform: 'scale(1.1)',
                                                        },
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleEditClick(item)}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: "green",
                                                        borderColor: 'green',
                                                        transition: 'transform 0.3s, color 0.3s',
                                                        '&:hover': {
                                                            backgroundColor: 'darkgreen',
                                                            transform: 'scale(1.1)',
                                                        },
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                        </span>
                                    </div>
                                    {/* Emojis */}
                                    <div className='flex m-auto items-center w-1/2 justify-around'>
                                        <svg onClick={(e) => updateThumbsUp(e, item.id)}
                                            className="w-6 h-6 text-green-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150 
                                    " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                            onMouseEnter={() => setThumbsUpHovered(item.id)}  // Show hover state
                                            onMouseLeave={() => setThumbsUpHovered(null)} // Hide hover state 
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                                        </svg>
                                        {/* Conditionally render thumbsUp count on hover */}
                                        {thumbsUpHovered === item.id && (
                                            <p className='text-sm -m-1'>
                                                {item.votes.thumbsUp}
                                            </p>
                                        )}
                                        <svg onClick={(e) => updateThumbsDown(e, item.id)} className="w-6 h-6 text-black dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                            onMouseEnter={() => setThumbsDownHovered(item.id)}
                                            onMouseLeave={() => setThumbsDownHovered(null)}
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                                        </svg>
                                        {thumbsDownHovered === item.id && (
                                            <p className='text-sm -m-1'>
                                                {item.votes.thumbsDown}
                                            </p>
                                        )}
                                        <svg onClick={(e) => updateHeart(e, item.id)} className="w-6 h-6 text-red-600 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                            onMouseEnter={() => setHeartHovered(item.id)}  // Show hover state
                                            onMouseLeave={() => setHeartHovered(null)} // Hide hover state 
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                        </svg>
                                        {heartHovered === item.id && (
                                            <p className='text-sm -m-1'>
                                                {item.votes.heart}
                                            </p>
                                        )}
                                        <svg onClick={(e) => updateSmile(e, item.id)} className="w-6 h-6 text-yellow-500 dark:text-white cursor-pointer transform transition-transform duration-200 hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                            onMouseEnter={() => setSmileHovered(item.id)}  // Show hover state
                                            onMouseLeave={() => setSmileHovered(null)} // Hide hover state 
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
                                        </svg>
                                        {smileHovered === item.id && (
                                            <p className='text-sm -m-1'>
                                                {item.votes.smile}
                                            </p>
                                        )}
                                    </div>
                                </Box>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        </DndProvider>
    )
}

export default Group

