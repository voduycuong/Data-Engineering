import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Checkbox,
  Divider,
  Flex,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import GoogleButton from "./GoogleButton";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();
    // Add sign-in logic
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        width="70vw"
        height="70vh"
        boxShadow="2xl"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
      >
        {/* Left side with the form */}
        <Box
          flex="1"
          p={8}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxW="md"
          w="full"
          zIndex={1} 
        >
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Sign In
          </Heading>

          <GoogleButton text="Sign in with Google" />

          <Divider my={6} />

          <form onSubmit={handleSignIn}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={togglePasswordVisibility}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Flex justify="space-between" align="center">
                <Checkbox defaultIsChecked>Keep me logged in</Checkbox>
                <Text color="blue.500" as="a" href="#" fontSize="sm">
                  Forgot password?
                </Text>
              </Flex>

              <Button
                type="submit"
                bg="#4072EE"
                color="white"
                _hover={{ bg: "#305ACF" }}
                size="lg"
                width="full"
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Text textAlign="center" mt={6}>
            Not registered yet?{" "}
            <a href="/signin" style={{ color: "blue" }}>
              Create an Account
            </a>
          </Text>
        </Box>

        {/* Right side with the gradient background */}
        <Box
          flex="1"
          backgroundImage="linear-gradient(135deg, #4072EE 0%, #A56EFF 100%)"
          backgroundSize="cover"
          backgroundPosition="center"
        />
      </Box>
    </Flex>
  );
};

export default SignIn;