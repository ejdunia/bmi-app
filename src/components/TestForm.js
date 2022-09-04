{
    /* <MainContainer>
                <ToastContainer />

                <DashboardContainer>
                    <FlexColumn>
                        <InfoContainer>
                            <MeasurementDiv>
                                <DataCard
                                    name={"Height"}
                                    value={
                                        `${bmiInfo.height}` === "undefined"
                                            ? 0
                                            : `${bmiInfo.height} Kg`
                                    }
                                />
                                <DataCard
                                    primary
                                    name={"Weight"}
                                    value={
                                        `${bmiInfo.weight}` === "undefined"
                                            ? 0
                                            : `${bmiInfo.weight} Kg`
                                    }
                                />
                            </MeasurementDiv>
                            <BmiInfo
                                BMI={
                                    `${bmiInfo.BMI}` === "undefined"
                                        ? 0
                                        : bmiInfo.BMI
                                }
                            />
                        </InfoContainer>

                        <ChartContainer>
                            <span></span>
                            {pieData?.length !== 1 && (
                                <Doughnut
                                    data={pieChartData}
                                    options={{ maintainAspectRatio: false }}
                                />
                            )}
                        </ChartContainer>
                        <ChartContainer>
                            <span></span>
                            <Line options={options} data={data} />

                         //   maek a weekly table tracker
                        </ChartContainer>
                    </FlexColumn>

                    <FlexColumn>
                        <Container>
                            {true && (
                                <PersonForm
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            )}
                            <div>
                                <ToggleContainer>
                                    <CheckboxToggle
                                        onChange={() =>
                                        setShowQuotes(() => )
                                            // setShowQuote1(!showQuote1)
                                        }
                                    />
                                    <span>Toggle Motivational Quote</span>
                                </ToggleContainer>
                                <ToggleContainer>
                                    <Toggle2
                                        onToggleChange={() =>
                                            setShowQuote2(!showQuote2)
                                        }
                                    />{" "}
                                    <span>Toggle Fitness quote</span>
                                </ToggleContainer>
                                {showQuote1 && <QuotesCard />}

                                {showQuote2 && <QuotesCard2 />}
                            </div>
                        </Container>
                        <FoodTrackerBox>
                            <SearchBar
                                onSearchSubmit={onSearchFormSubmit}
                                barOpened={barOpened}
                                setBarOpened={setBarOpened}
                                input={searchInput}
                                handleSearchInputChange={handleSearchInput}
                            />
                            <SaveButton
                                onClick={() =>
                                    dbService.saveTableData(
                                        nutritionDBData,
                                        nutriTableList,
                                        setNutritionDBData,
                                        setPieData
                                    )
                                }
                            />

                            <StyledTable>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Fat(g)</td>
                                        <td>Carbs(g)</td>
                                        <td>Protien(g)</td>
                                        <td></td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {nutriListEmpty
                                        ? dummyData.map((item) => (
                                              <NutriItem
                                                  key={item.name}
                                                  item={item}
                                                  handleDelete={() => {
                                                      return;
                                                  }}
                                              />
                                          ))
                                        : nutriTableList.map((item) => (
                                              <NutriItem
                                                  key={item.name}
                                                  item={item}
                                                  handleDelete={() => {
                                                      dbService.deleteItem(
                                                          item.name,
                                                          nutritionDBData,
                                                          nutriTableList,
                                                          setNutriTableList,
                                                          setPieData
                                                      );
                                                  }}
                                              />
                                          ))}
                                </tbody>
                            </StyledTable>
                        </FoodTrackerBox>
                    </FlexColumn>
                </DashboardContainer>
            </MainContainer> */
}
