import React from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { BookList } from "../components";
import Rating from '../components/Rating';
import {
  Collapse,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import StarRating from "../components/StarRating";


export const SellerProfilePage = () => {
    const location = useLocation();
    const sellerEmail = location.pathname.split("/")[2];

    const [reviews, setReviews] = useState([]);
    const [sellerRating, setSellerRating] = useState(0);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [privileges, setPrivileges] = useState('');
  const [books, setBooks] = useState([]);
  

  //Rating value for posting reviews
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState('');
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

  useEffect(() => {
    
    fetchReviewsAndRatings(sellerEmail);
  }, [sellerEmail]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/post-review", {
        seller_email :sellerEmail,
        comment: reviewComment,
        rating: ratingValue,
        title: reviewTitle,
      });
      // Refresh the reviews and ratings
      fetchReviewsAndRatings(sellerEmail);
      // Reset the rating and review form
      setRatingValue(0);
      setReviewComment("");
      setReviewTitle("");
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleToggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <>
      <Flex direction="column" className="header-color" py="2rem">
        <h1><b>Seller Profile</b></h1>
      </Flex>
      <Grid templateColumns="12% 1fr" gap={10} m="2rem 2rem auto 2rem">
        <GridItem>
          <Sidebar />
        </GridItem>

        <Box
          gridColumn="2"
          h="auto"
          display="flex"
          flexDirection="column"

          // Insert profile elements below
        >
          <div className="container">
            <div className="profileInfo">
              <Image
                mt=".5rem"
                borderRadius="full"
                boxSize="150px"
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.webp"
                alt="default pic"
              />
              <Badge m="1rem auto">
                {first} {last}{" "}
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
                            <StarRating
                              maxStars={5}
                              onRatingChange={(value) => setRatingValue(value)}
                            />
                            <Stack spacing={4}>
                            <FormControl>
                              <FormLabel>Review Title</FormLabel>
                              <Input
                                placeholder="Enter review title"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                            

                                <FormLabel>Review</FormLabel>
                                <Textarea
                                placeholder="Write your review here"
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
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

              <h4>Temp #Listings</h4>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={4}
                width="100%"
                mb="2rem"
              >
                {books.map((book) => (
                    <BookList book={book} privileges="Admin" />
                ))}
              </Stack>

            </div>
          </div>
        </Box>
      </Grid>
    </>
  );
};
