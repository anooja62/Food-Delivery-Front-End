import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import hotel1 from '../../assets/images/hotel1.jpg'
import hotel2 from '../../assets/images/hotel2.jpg'
import hotel3 from '../../assets/images/hotel3.jpg'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
const images = [
  {
    imgUrl: hotel1,
    title: 'DineOut',
    width: '30%',
  
  },
  {
    imgUrl: hotel2,
    title: 'Rahmath Hotel',
    width: '40%',
  },
  {
    imgUrl: hotel3,
    title: 'Arya Bhavan Veg',
    width: '30%',
    
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const handleDragStart = (e) => e.preventDefault();

const responsive = {
    0: { items: 1 },
    568: { items: 4 },
    1024: { items: 6 },
  };
const items = [
    <div className="rest__ui">
    <img src={hotel1} alt="cute cat"/>
  </div>,
  <div className="rest__ui">
    <img src={hotel2} alt="cute cat"/>
  </div>,
  <div className="rest__ui">
    <img src={hotel3} alt="cute cat"/>
  </div>,
  <div className="rest__ui">
    <img src={hotel1} alt="cute cat"/>
  </div>,
  <div className="rest__ui">
    <img src={hotel3} alt="cute cat"/>
  </div>,
  <div className="rest__ui">
    <img src={hotel2} alt="cute cat"/>
  </div>,
  <div className="rest__ui">
    <img src={hotel1} alt="cute cat"/>
  </div>,
  <div className="rest__ui">
    <img src={hotel3} alt="cute cat"/>
  </div>,
  ];


export default function ButtonBases() {
  return (
    <div>
      <h1 className='text-center mt-5'>Order from your favourite Restaurant </h1>
      
    <section style={{
            paddingLeft: 55,
            paddingRight: 55,
          }} >
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.imgUrl})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>

    <h1 className='text-center mt-5'>Inspiration for your first order</h1>
        <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
      />
    </section>
    </div>
  );
}
