import axiosInstance from "@/lib/axiosInstance";

const usePollService = () => {
  interface PollData {
    category: string;
    emotional?: string;
  }

  const createPoll = (data: PollData) => {
    return axiosInstance.post(`/poll`, data);
  };

  const createPollWithEmotional = (data: PollData) => {
    return axiosInstance.post(`/poll`, data);
  };

  const getPolls = () => {
    return axiosInstance.get(`/`);
  };

  const getPollById = (id: string) => {
    return axiosInstance.get(`/${id}`);
  };

  return {
    createPoll,
    createPollWithEmotional,
    getPolls,
    getPollById,
  };
};

export default usePollService;
