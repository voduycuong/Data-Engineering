import React, { useEffect, useState } from 'react';
import {
    Tabs, TabList, TabPanels, Tab, TabPanel,
    FormControl, FormLabel, Input, Select, Switch,
    Box, Button, Flex, Stack, Heading, Grid, Avatar, IconButton,
    Text,
} from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/auth';

export default function SettingsPage() {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        dob: '',
        address: '',
        city: '',
        country: '',
    });

    const [notificationPreferences, setNotificationPreferences] = useState({
        allowAll: false,
        sms: false,
        emails: false,
        pushNotifications: false,
    });

    const [language, setLanguage] = useState('en');

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/signin');
        } else {
            axios.get(`${BASE_URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log('Fetched user data:', response.data); // Debug log
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [navigate]);
    

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleNotificationChange = (e) => {
        const { id, checked } = e.target;
        setNotificationPreferences(prevState => ({
            ...prevState,
            [id]: checked,
        }));
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleSave = () => {
        const token = sessionStorage.getItem('token');
        axios.put(`${BASE_URL}/update`, userData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            alert('User information updated successfully!');
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            alert('Failed to update user information.');
        });
    };

    return (
        <Flex
            p={{ base: 4, md: 8 }}
            flex="1"
            bg="gray.100"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            position="relative"
            className="bg-gray-100"
        >
            <Heading
                size="5xl"
                position="absolute"
                top={{ base: '20px', md: '40px' }}
                left={{ base: '20px', md: '40px' }}
                fontSize={{ base: '2xl', md: '3xl' }}
                className="text-gray-800"
            >
                Settings
            </Heading>
            <Box
                p={{ base: 4, md: 8 }}
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                maxW={{ base: '100%', md: '1000px', lg: '1200px' }}
                w="90%"
                minH={{ base: '600px', md: '800px' }}
                position="relative"
                pt={10}
                className="shadow-md"
            >
                <Tabs variant="unstyled">
                    <TabList>
                        <Tab
                            fontSize={{ base: 'md', md: 'lg' }}
                            borderRadius="0"
                            marginRight="20px"
                            color="gray.500"
                            _focus={{ boxShadow: 'none', outline: 'none' }}
                            _selected={{ color: 'blue.500', borderBottom: '4px solid', borderBottomColor: 'blue.500' }}
                            _hover={{ color: 'blue.500', borderColor: 'white' }}
                        >
                            Edit Profile
                        </Tab>
                        <Tab
                            fontSize={{ base: 'md', md: 'lg' }}
                            borderRadius="0"
                            marginRight="20px"
                            color="gray.500"
                            _focus={{ boxShadow: 'none', outline: 'none' }}
                            _selected={{ color: 'blue.500', borderBottom: '4px solid', borderBottomColor: 'blue.500' }}
                            _hover={{ color: 'blue.500', borderColor: 'white' }}
                        >
                            Notifications
                        </Tab>
                        <Tab
                            fontSize={{ base: 'md', md: 'lg' }}
                            borderRadius="0"
                            marginRight="20px"
                            color="gray.500"
                            _focus={{ boxShadow: 'none', outline: 'none' }}
                            _selected={{ color: 'blue.500', borderBottom: '4px solid', borderBottomColor: 'blue.500' }}
                            _hover={{ color: 'blue.500', borderColor: 'white' }}
                        >
                            Language
                        </Tab>
                    </TabList>

                    <TabPanels>
                        {/* Edit Profile Panel */}
                        <TabPanel>
                            <Flex alignItems="flex-start" mb={6} className="mb-6">
                                <Avatar size={{ base: 'lg', md: '2xl' }} src="avatar-1.jpg" mt={6} />
                                <IconButton
                                    aria-label="Edit avatar"
                                    icon={<FiEdit2 color="white" />}
                                    ml={-12}
                                    mt={100}
                                    bg="blue.500"
                                    borderRadius="full"
                                    boxShadow="md"
                                    size={{ base: 'md', md: 'lg' }}
                                    className="shadow-md"
                                    _hover={{ bg: 'blue.600' }}
                                />
                                <Box ml={4} flex="1">
                                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8} className="p-4">
                                        <FormControl id="name">
                                            <FormLabel className="text-lg md:text-xl">Your Name</FormLabel>
                                            <Input value={userData.name || ''} onChange={handleChange} size="lg" className="border-gray-300" />
                                        </FormControl>
                                        <FormControl id="username">
                                            <FormLabel className="text-lg md:text-xl">User Name</FormLabel>
                                            <Input value={userData.username || ''} onChange={handleChange} size="lg" className="border-gray-300" />
                                        </FormControl>
                                        <FormControl id="email">
                                            <FormLabel className="text-lg md:text-xl">Email</FormLabel>
                                            <Input type="email" value={userData.email || ''} onChange={handleChange} size="lg" className="border-gray-300" />
                                        </FormControl>
                                        <FormControl id="password">
                                            <FormLabel className="text-lg md:text-xl">Password</FormLabel>
                                            <Input type="password" placeholder="********" onChange={handleChange} size="lg" className="border-gray-300" />
                                        </FormControl>
                                        <FormControl id="dob">
                                            <FormLabel className="text-lg md:text-xl">Date of Birth</FormLabel>
                                            <Input type="date" value={userData.dob || ''} onChange={handleChange} size="lg" className="border-gray-300" />
                                        </FormControl>
                                        <FormControl id="address">
                                            <FormLabel className="text-lg md:text-xl">Address</FormLabel>
                                            <Input value={userData.address || ''} onChange={handleChange} size="lg" className="border-gray-300" />
                                        </FormControl>
                                        <FormControl id="city">
                                            <FormLabel className="text-lg md:text-xl">City</FormLabel>
                                            <Input value={userData.city || ''} onChange={handleChange} size="lg" className="border-gray-300" />
                                        </FormControl>
                                        <FormControl id="country">
                                            <FormLabel className="text-lg md:text-xl">Country</FormLabel>
                                            <Input value={userData.country || ''} onChange={handleChange} size="lg" className="border-gray-300" />
                                        </FormControl>
                                    </Grid>
                                </Box>
                            </Flex>
                        </TabPanel>

                        {/* Notifications Panel */}
                        <TabPanel>
                            <Stack spacing={6} className="p-4">
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="allowAll" mb="0">
                                        Allow All Notifications
                                    </FormLabel>
                                    <Switch id="allowAll" isChecked={notificationPreferences.allowAll} onChange={handleNotificationChange} />
                                </FormControl>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="sms" mb="0">
                                        SMS Notifications
                                    </FormLabel>
                                    <Switch id="sms" isChecked={notificationPreferences.sms} onChange={handleNotificationChange} />
                                </FormControl>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="emails" mb="0">
                                        Email Notifications
                                    </FormLabel>
                                    <Switch id="emails" isChecked={notificationPreferences.emails} onChange={handleNotificationChange} />
                                </FormControl>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="pushNotifications" mb="0">
                                        Push Notifications
                                    </FormLabel>
                                    <Switch id="pushNotifications" isChecked={notificationPreferences.pushNotifications} onChange={handleNotificationChange} />
                                </FormControl>
                            </Stack>
                        </TabPanel>

                        {/* Language Panel */}
                        <TabPanel>
                            <FormControl className="p-4">
                                <FormLabel className="text-lg md:text-xl">Preferred Language</FormLabel>
                                <Select value={language} onChange={handleLanguageChange} size="lg" className="border-gray-300">
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    {/* Add more languages as needed */}
                                </Select>
                            </FormControl>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Flex justify="end" position="absolute" bottom="20px" right="20px">
                    <Button colorScheme="blue" size="lg" className="h-16 w-44" onClick={handleSave}>
                        Save
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}
