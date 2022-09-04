{
    /* <MainContainer>
                        
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
