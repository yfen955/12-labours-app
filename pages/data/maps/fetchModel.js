import axios from "axios";
import backendQuery from "@/services/backendQuery";

export const fetchModelInfo = async (query_api_url, uuid) => {
  let program, project;
  let programPath = `${query_api_url}/program`;
  await axios
    .get(programPath)
    .then((res) => {
      program = res.data.program[0];
    })
    .catch((err) => {
      console.log(err);
    });

  let projectPath = `${query_api_url}/project/${program}`;
  await axios
    .get(projectPath)
    .then((res) => {
      project = res.data.project[0];
    })
    .catch((err) => {
      console.log(err);
    });

  const path = `${query_api_url}/record/${uuid}`;
  let data = await backendQuery.getSingleData(path, program, project);
  return data;
};

export default {
  fetchModelInfo,
};
