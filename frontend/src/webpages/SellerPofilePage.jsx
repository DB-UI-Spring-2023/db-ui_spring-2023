import React, { useState, useEffect } from 'react';
import {
  Heading,
  Image,
  Badge,
  Box,
  Flex,
  Text,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Collapse,
  Wrap,
} from '@chakra-ui/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BookList } from '../components';
import Home from "../components/Home";
import Rating from '../components/Rating';
import { FiHome } from "react-icons/fi";

const SellerProfilePage = () => {
    const location = useLocation();
    const sellerEmail = location.pathname.split("/")[2];

    const [reviews, setReviews] = useState([]);
    const [sellerRating, setSellerRating] = useState(0);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [privileges, setPrivileges] = useState('');
  const [books, setBooks] = useState([]);
  const [review, setReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    const fetchBooksBySeller = async (email) => {
      try {
        const response = await axios.get(`http://localhost:8000/books/${email}`);
        console.log('Books fetched successfully:', response.data);
        setBooks(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooksBySeller(sellerEmail);
  }, [sellerEmail]);

  useEffect(() => {
    const fetchUserInfo = async (email) => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${email}`);
        console.log('User info fetched successfully:', response.data);
        setFirst(response.data[0].firstName);
        setLast(response.data[0].lastName);
        setPrivileges(response.data[0].privileges);
        return response.data;
      } catch (error) {
        console.error('Error fetching User:', error);
      }
    };
    fetchUserInfo(sellerEmail);
  }, [sellerEmail]);

  useEffect(() => {
    const fetchReviewsAndRatings = async (email) => {
      try {
        const response = await axios.get(`http://localhost:8000/reviews/${email}`);
        console.log('Reviews and ratings fetched successfully:', response.data);
        setReviews(response.data.reviews);
        setSellerRating(response.data.rating);
        return response.data;
      } catch (error) {
        console.error('Error fetching reviews and ratings:', error);
      }
    };
    fetchReviewsAndRatings(sellerEmail);
  }, [sellerEmail]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    // Implement logic to submit a review using Chakra UI components
    // ...
  };

  const handleToggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <>
      <Heading mt="2rem" as="h1" size="2xl" textAlign="center">
        Seller Profile
      </Heading>
      <Home
        navSize="large"
        icon={FiHome}
        id="home"
        title="Home"
      />
      <div class="profileInfo">
        <Image
          mt=".5rem"
          borderRadius="full"
          boxSize="150px"
          src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.webp"
          alt="default pic"
        />
        <Badge>
          {first} {last}
        </Badge>
        <h2>({privileges})</h2>
        <h4>Current Rating</h4>
        <Rating value={sellerRating}/>
        {reviews.length === 0 ? (
              <Text>No reviews available</Text>
            ) : (
              reviews.map((review) => (
                <Box key={review.id} borderWidth={1} borderRadius="lg" p={4} mb={2}>
                  <Text fontWeight="bold">{review.title}</Text>
                  <Rating value={review.rating} />
                  <Text>{review.comment}</Text>
                </Box>
              ))
            )}
        <h4>Listings</h4>
            
            <Wrap spacing={4} width="100%">
                {books.map((book) => (
                    <BookList key={book.IBSN} book = {book} />
                ))}
            </Wrap>

        <Box>
          <Flex justifyContent="center">
            <Box mt="4">
              <Button
                colorScheme="teal"
                onClick={handleToggleReviewForm}
                mb={4}
              >
                Write a Review
              </Button>
              <Collapse in={showReviewForm}>
                <Box>
                  <Flex justifyContent="center">
                    <Box mt="4">
                      <Text fontSize="2xl" fontWeight="bold">
                        Submit a Review
                      </Text>
                      <Stack spacing={4}>
                      <FormControl>
                        <FormLabel>Review</FormLabel>
                        <Textarea
                          placeholder="Write your review here"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                        />
                      </FormControl>
                      <Button colorScheme="teal" onClick={handleSubmitReview}>
                        Submit Review
                      </Button>
                    </Stack>
                  </Box>
                </Flex>
              </Box>
            </Collapse>
          </Box>
        </Flex>
      </Box>
    </div>
  </>
);
};

export default SellerProfilePage;
