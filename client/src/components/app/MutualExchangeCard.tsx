import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/useAppSelector";
import ProposedModal from "./ProposedModal";
import { useState } from "react";
import { privateApi } from "@/utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editExchange, fetchExchanges } from "@/store/exchangeSlice";
import { PostDetailsModal } from "./PostDetailsModal";
import { editPost } from "@/store/postSlice";
import { addDeal } from "@/store/dealSlice";

const MutualExchangeCard = ({ exchange, onRefresh }: any) => {
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.user.currentUserToken);
  const users = useAppSelector((state: any) => state.user.users);
  const posts = useAppSelector((state: any) => state.post.posts);
  const currentUserId = useAppSelector((state) => state.user.currentUserId);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState<boolean>(false);

  const post = posts.find((post: any) => post._id === exchange.postId);

  const otherUserId =
    exchange.receiverId === currentUserId
      ? exchange.proposerId
      : exchange.receiverId;

  const otherUser = users.find((user: any) => user._id === otherUserId);

  const yourSkill =
    exchange.receiverId === currentUserId
      ? exchange.skillOffer
      : exchange.skillSeek;

  const otherSkill =
    exchange.receiverId === currentUserId
      ? exchange.skillSeek
      : exchange.skillOffer;

  const handleCancelProposal = async () => {
    try {
      const response = await privateApi.put(
        `http://localhost:8080/api/exchange/${currentUserId}`,
        { exchangeId: exchange._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onRefresh();
      dispatch(
        editExchange({
          exchangeId: exchange._id,
          newData: response?.data?.updatedExchange,
        })
      );
      toast.success(response?.data?.message);
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleRejectProposal = async () => {
    try {
      const response = await privateApi.put(
        `http://localhost:8080/api/reject-exchange/${currentUserId}`,
        { exchangeId: exchange._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onRefresh();
      dispatch(
        editExchange({
          exchangeId: exchange._id,
          newData: response?.data?.updatedExchange,
        })
      );
      toast.success(response?.data?.message);
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleAcceptProposal = async () => {
    const proposalData = {
      proposerId: exchange?.proposerId,
      postId: exchange?.postId,
      exchangeId: exchange?._id,
      skillOffer: exchange?.skillOffer,
      skillSeek: exchange?.skillSeek,
    };

    try {
      const response = await privateApi.post(
        `http://localhost:8080/api/deal/${currentUserId}`,
        { ...proposalData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response?.data);

      dispatch(
        editPost({
          postId: exchange.postId,
          newData: response?.data?.updatedPost,
        })
      );
      dispatch(fetchExchanges(response?.data?.updatedExchanges));
      dispatch(addDeal(response?.data?.newDeal));
      onRefresh();
      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`${yourSkill} ↔ ${otherSkill}`}</CardTitle>
        <CardDescription>
          {`Between You and ${otherUser?.firstName} ${otherUser?.lastName}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge
            variant={exchange.status === "Completed" ? "default" : "outline"}>
            {exchange.status}
          </Badge>
          <div className="text-yellow-500">{exchange.rating}</div>
        </div>
      </CardContent>
      <CardFooter className="space-x-4">
        {/* {exchange.status === "Completed" && (
          <Button variant="outline">Leave Review</Button>
        )}
        {exchange.status === "Upcoming" && (
          <>
            <Button variant="outline">Reschedule</Button>
            <Button variant="destructive">Cancel</Button>
          </>
        )}
        {exchange.status === "Pending" && (
          <>
            <Button variant="outline">Decline</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Confirm
            </Button>
          </>
        )} */}
        {exchange.receiverId === currentUserId &&
        exchange.status === "Pending" ? (
          <div className="flex justify-between w-full">
            <div className="w-full flex items-center justify-between">
              <div className="space-x-4">
                <Button
                  onClick={handleRejectProposal}
                  className="bg-red-600 hover:bg-red-700">
                  Decline Proposal
                </Button>
                <Button
                  onClick={() => setIsModalDetailsOpen(true)}
                  variant="outline">
                  View Details
                </Button>
              </div>
              <div className="space-x-4">
                <Button onClick={() => setIsModalOpen(true)} variant="outline">
                  View Proposal
                </Button>
                <Button
                  onClick={handleAcceptProposal}
                  className="bg-emerald-600 hover:bg-emerald-700">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        ) : exchange.status === "Cancelled" ||
          exchange.status === "Rejected" ? (
          <div className="space-x-4">
            <Button className="bg-red-600 hover:bg-red-700">Delete</Button>
          </div>
        ) : (
          <div className="flex justify-end w-full">
            <div className="w-full flex items-center justify-between">
              <Button
                onClick={() => setIsModalDetailsOpen(true)}
                variant="outline">
                View Details
              </Button>
              <div className="space-x-4 justify-end">
                <Button onClick={() => setIsModalOpen(true)} variant="outline">
                  View Proposal
                </Button>
                <Button
                  onClick={handleCancelProposal}
                  className="bg-red-600 hover:bg-red-700">
                  Cancel Proposal
                </Button>
              </div>
            </div>
          </div>
        )}

        <ProposedModal
          isModalOpen={isModalOpen}
          isCancel={() => setIsModalOpen(false)}
          name={`${otherUser.firstName} ${otherUser.lastName}`}
          skillSeek={yourSkill}
          skillOffer={otherSkill}
          receiverId={otherUserId}
          postId={exchange.postId}
          exchangeId={exchange._id}
        />

        <PostDetailsModal
          isModalDetailsOpen={isModalDetailsOpen}
          isClose={() => setIsModalDetailsOpen(false)}
          item={post}
          user={otherUser}
        />
      </CardFooter>
    </Card>
  );
};

export default MutualExchangeCard;
