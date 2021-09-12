import { Text } from '@chakra-ui/react'
import ShowPlan from './ShowPlan'

export default function PlanHome(): JSX.Element {
    return (
    <>
    <Text
          ml={["2vw", "2vw", "2vw", "1vw", 0]}
          mt={["2", "2", "2", "2", "32px"]}
          mb="1"
          fontSize={["2xl", "3xl"]}
          fontWeight="bold"
        >
          Plan
    </Text>
    <ShowPlan />
    </>
    )
}