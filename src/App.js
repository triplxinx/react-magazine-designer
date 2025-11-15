import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Toolbar from './components/Toolbar';
import PageCanvas from './components/PageCanvas';
import ExportButton from './components/ExportButton';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_DPI = Number(process.env.REACT_APP_DEFAULT_DPI) || 300;
const DEFAULT_PAGE_WIDTH_MM = Number(process.env.REACT_APP_DEFAULT_PAGE_WIDTH_MM) || 210;
const DEFAULT_PAGE_HEIGHT_MM = Number(process.env.REACT_APP_DEFAULT_PAGE_HEIGHT_MM) || 297;
const DEFAULT_MARGIN_MM = Number(process.env.REACT_APP_DEFAULT_MARGIN_MM) || 10;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f0f0;
  flex-direction: column;
`;

const MainArea = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const CanvasWrapper = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow: auto;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

function App() {
  // Page size state in mm
  const [pageSize, setPageSize] = useState({
    width: DEFAULT_PAGE_WIDTH_MM,
    height: DEFAULT_PAGE_HEIGHT_MM,
    dpi: DEFAULT_DPI,
    margin: DEFAULT_MARGIN_MM
  });

  // Pages array
  const [pages, setPages] = useState(() => {
    // Initialize with one empty page
    return [
      {
        id: uuidv4(),
        elements: []
      }
    ];
  });

  // Current page index
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Add element to current page
  const addElement = useCallback(
    (type) => {
      setPages((prevPages) => {
        const newPages = [...prevPages];
        const currentPage = newPages[currentPageIndex];

        if (!currentPage) return prevPages;

        let newElement = null;

        switch (type) {
          case 'text':
            newElement = {
              id: uuidv4(),
              type: 'text',
              x: 20,
              y: 20,
              width: 200,
              height: 80,
              content: 'Edit text...',
              style: {
                fontSize: 18,
                fontFamily: 'Arial',
                color: '#000000',
                textAlign: 'left',
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none'
              }
            };
            break;
          case 'image':
            newElement = {
              id: uuidv4(),
              type: 'image',
              x: 20,
              y: 20,
              width: 200,
              height: 150,
              src: 'https://picsum.photos/400/300',
              scale: 1,
              crop: { x: 0, y: 0, width: 1, height: 1 }
            };
            break;
          case 'shape':
            newElement = {
              id: uuidv4(),
              type: 'shape',
              x: 20,
              y: 20,
              width: 150,
              height: 100,
              shapeType: 'rectangle',
              fillColor: '#ff0000',
              strokeColor: '#000000',
              strokeWidth: 2
            };
            break;
          default:
            return prevPages;
        }

        currentPage.elements.push(newElement);
        return newPages;
      });
    },
    [currentPageIndex]
  );

  // Update element on current page
  const updateElement = useCallback(
    (pageId, elementId, updatedProps) => {
      setPages((prevPages) => {
        const newPages = prevPages.map((page) => {
          if (page.id !== pageId) return page;
          return {
            ...page,
            elements: page.elements.map((el) =>
              el.id === elementId ? { ...el, ...updatedProps } : el
            )
          };
        });
        return newPages;
      });
    },
    []
  );

  // Delete element on current page
  const deleteElement = useCallback(
    (pageId, elementId) => {
      setPages((prevPages) => {
        const newPages = prevPages.map((page) => {
          if (page.id !== pageId) return page;
          return {
            ...page,
            elements: page.elements.filter((el) => el.id !== elementId)
          };
        });
        return newPages;
      });
    },
    []
  );

  // Add new blank page
  const addPage = useCallback(() => {
    setPages((prevPages) => [
      ...prevPages,
      {
        id: uuidv4(),
        elements: []
      }
    ]);
    setCurrentPageIndex(pages.length);
  }, [pages.length]);

  // Remove current page (if more than one page)
  const removeCurrentPage = useCallback(() => {
    if (pages.length <= 1) return;
    setPages((prevPages) => {
      const newPages = prevPages.filter((_, idx) => idx !== currentPageIndex);
      return newPages;
    });
    setCurrentPageIndex((idx) => (idx > 0 ? idx - 1 : 0));
  }, [pages.length, currentPageIndex]);

  // Change page size presets
  const changePageSize = useCallback((size) => {
    setPageSize((prev) => ({
      ...prev,
      ...size
    }));
  }, []);

  // Change current page
  const goToPage = useCallback(
    (index) => {
      if (index < 0 || index >= pages.length) return;
      setCurrentPageIndex(index);
    },
    [pages.length]
  );

  return (
    <AppContainer>
      <Toolbar
        addElement={addElement}
        pageSize={pageSize}
        changePageSize={changePageSize}
        addPage={addPage}
        removeCurrentPage={removeCurrentPage}
        pagesCount={pages.length}
        currentPageIndex={currentPageIndex}
        goToPage={goToPage}
      />
      <MainArea>
        <CanvasWrapper>
          <PageCanvas
            key={pages[currentPageIndex] ? pages[currentPageIndex].id : 'empty'}
            page={pages[currentPageIndex]}
            pageSize={pageSize}
            updateElement={updateElement}
            deleteElement={deleteElement}
          />
        </CanvasWrapper>
      </MainArea>
      <ExportButton pages={pages} pageSize={pageSize} />
    </AppContainer>
  );
}

export default App;
