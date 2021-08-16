import React, { useEffect, useState } from "react";
import { IconButton, Text, VStack } from "@chakra-ui/react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";

const VoteButtons = ({ post }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [votedPosts, setVotedPosts] = useState([]);

  useEffect(() => {
    const votesFromLocalStorage = localStorage.getItem("votes") || [];
    let previousVotes = [];
    try {
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (error) {
      console.error(error);
    }
    setVotedPosts(previousVotes);
  }, []);

  const handleDisableVoting = (postId) => {
    const previousVotes = votedPosts;
    previousVotes.push(postId);
    setVotedPosts(previousVotes);

    localStorage.setItem("votes", JSON.stringify(votedPosts));
  };

  const handleClick = async (type) => {
    setIsVoting(true);
    let upVotesCount = post.upVotesCount;
    let downVotesCount = post.downVotesCount;
    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    await db.collection("posts").doc(post.id).set({
      title: post.title,
      upVotesCount,
      downVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toISOString(),
    });
    handleDisableVoting(post.id);
    setIsVoting(false);
  };

  const checkIfPostIsAlreadyVoted = () => {
    if (votedPosts.indexOf(post.id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="purple"
          aria-label="Upvote"
          icon={<FiArrowUp />}
          onClick={() => handleClick("upvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted()}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.upVotesCount}
        </Text>
      </VStack>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="yellow"
          aria-label="DownVote"
          icon={<FiArrowDown />}
          onClick={() => handleClick("downvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted()}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.downVotesCount}
        </Text>
      </VStack>
    </>
  );
};

export default VoteButtons;
