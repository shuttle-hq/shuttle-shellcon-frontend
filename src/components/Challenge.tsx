
import React from 'react';
import ChallengeCard from './challenge/ChallengeCard';
import { Challenge as ChallengeType } from '../hooks/useAquariumData';

interface ChallengeProps {
  challenge: ChallengeType;
}

const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  return <ChallengeCard challenge={challenge} />;
};

export default Challenge;
