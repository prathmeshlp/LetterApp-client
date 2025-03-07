import { Letter } from "../types/letter";

interface LetterListProps {
  letters: Letter[];
  setSelectedLetter: React.Dispatch<React.SetStateAction<Letter | null>>;
  setLetters?: React.Dispatch<React.SetStateAction<Letter[]>>;
}

const LetterList: React.FC<LetterListProps> = ({
  letters,
  setSelectedLetter,
}) => {
  const handleSelect = (letter: Letter) => {
    setSelectedLetter(letter);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Your Letters</h2>
      {letters.length === 0 ? (
        <p className="text-gray-500">No letters yet</p>
      ) : (
        <ul className="space-y-2">
          {letters.map((letter) => (
            <li
              key={letter._id}
              onClick={() => handleSelect(letter)}
              className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            >
              <div className="flex justify-between">
                <span>{letter.title}</span>
                {letter.googleDriveId && (
                  <span className="text-green-500 text-sm">Saved to Drive</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LetterList;
