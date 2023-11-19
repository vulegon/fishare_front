import { getSpots } from '../api/spot';
import { Spot } from '../types/Spot';
//データベースに登録されている釣り場を取得
export const fetchSpots = async (
  setSpotsData: React.Dispatch<React.SetStateAction<{ spots: Spot[]; isLoading: boolean }>>
) => {
  try {
    const response = await getSpots();
    if (response.status === 200) {
      const data = await response.json();
      setSpotsData((prevSpotsData) => ({ ...prevSpotsData, spots: data.spots }));
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
  setSpotsData((prevSpotsData) => ({ ...prevSpotsData, isLoading: false }));
};
