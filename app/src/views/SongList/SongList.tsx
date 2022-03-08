import { gql, useQuery } from "@apollo/client";

const GET_SONGS_QUERY = gql`
  query GetAllSongs {
    songs {
      id
      title
    }
  }
`;

type GetSongsQueryResponse = {
  songs: { title: string; id: string }[];
};

function SongList() {
  const { data, loading } = useQuery<GetSongsQueryResponse>(GET_SONGS_QUERY);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <ul>
      {data?.songs.map(({ id, title }) => {
        return <li key={id}>{title}</li>;
      })}
    </ul>
  );
}

export default SongList;
