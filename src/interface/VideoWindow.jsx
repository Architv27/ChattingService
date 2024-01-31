import React from 'react';
import { useEffect } from 'react';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import MeetingView from './MeetingView';

const VideoChat = () => {
  return (
    <MeetingProvider
    config={{
      meetingId: "4ke2-fr4i-7jbp",
      micEnabled: true,
      webcamEnabled: true,
      name: "Archit's Org",
    }}
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyOGRmYmU4ZC01Nzk4LTQzMmItOGZkNy1jZGNlZmVlY2Y5N2IiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwNjY4NjU2MCwiZXhwIjoxNzA2NzcyOTYwfQ.NklyM6rbBbw11A2lXrmUdDjkzYYDibDGBpRAf1ryjP8"
  >
    <MeetingView />
  </MeetingProvider>
  );
};

const MeetingRoom = () => {
  const { join, leave, participants } = useMeeting();

  useEffect(() => {
    join();
    return () => leave();
  }, [join, leave]);

  return (
    <div>
      {Array.from(participants).map(([participantId, participant]) => (
        <ParticipantVideo key={participantId} participant={participant} />
      ))}
    </div>
  );
};

const ParticipantVideo = ({ participant }) => {
  const { webcamStream } = useParticipant(participant);

  if (!webcamStream) {
    return null;
  }

  return <video srcObject={webcamStream} autoPlay playsInline />;
};

export default VideoChat;
