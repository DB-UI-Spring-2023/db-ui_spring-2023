import React from "react";

import { Card, CardBody, Text, VStack, ButtonGroup, Button, Icon, Wrap } from "@chakra-ui/react";
import { TbFlag3Filled, TbTrashXFilled, TbEyeCheck } from "react-icons/tb";
import { useToast } from "@chakra-ui/react";

export const FlagReportAdminTab = ({ item }) => {
  const { id, seller_email, rating, title, comment } = item;

  return (
    <div>
      <p>ID: {id}</p>
      <p>Seller Email: {seller_email}</p>
      <p>Rating: {rating}</p>
      <p>Title: {title}</p>
      <p>Comment: {comment}</p>
    </div>
  );
};
export default FlagReportAdminTab;